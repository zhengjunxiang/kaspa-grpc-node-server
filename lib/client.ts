import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';
import { dpc, clearDPC } from '@aspectron/flow-async';
import * as gRPC from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {
	PendingReqs, IData, IStream, QueueItem, MessagesProto,
	ServiceClientConstructor, KaspadPackage, SubscriberItem, SubscriberItemMap,
	RPC as Rpc
} from '../types/custom-types';

 
export class Client {
	stream:IStream;
	options:any;
	pending:PendingReqs;
	intakeHandler:Function|undefined;
	reconnect:boolean = true;
	client:any|undefined;
	reconnect_dpc:number|undefined;
	verbose:boolean = false;
	log:Function;
	proto:KaspadPackage|undefined;
	subscribers: SubscriberItemMap = new Map();

	constructor(options:any) {
		this.options = Object.assign({
			protoPath: __dirname + '/../../messages.proto',
			host: 'localhost:16210'
		}, options||{});
		this.pending = { };
		this.log = Function.prototype.bind.call(
			console.log,
			console,
			`[KASPA-RPC-CLIENT]:`
		);
	}

	getServiceClient():ServiceClientConstructor {
		const {protoPath} = this.options;
		const packageDefinition = protoLoader.loadSync(protoPath, {
			keepCase: true,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true
		});

		const proto:MessagesProto = <MessagesProto>gRPC.loadPackageDefinition(packageDefinition);
		this.proto = proto.protowire;
		const {P2P, RPC} = proto.protowire;
		return RPC;
	}

	connect() {
		this.reconnect = true;
		this.verbose && this.log('gRPC Client connecting to', this.options.host);
		const RPC = this.getServiceClient();
		this.client = new RPC(this.options.host, gRPC.credentials.createInsecure(),
			{ 
				// "grpc.keepalive_timeout_ms": 25000 
				"grpc.max_receive_message_length": -1
			}
		);

		this.stream = this.createStream();
		this.initIntake(this.stream);
		const reconnect = () => {
			if(this.reconnect_dpc) {
				clearDPC(this.reconnect_dpc);
				delete this.reconnect_dpc;
			}

			this.clearPending();
			delete this.stream;
			delete this.client;
			if(this.reconnect) {
				this.reconnect_dpc = dpc(1000, () => {
					this.connect();
				})
			}
		}
		this.stream.on('error', (error:any) => {
			this.verbose && this.log('stream:error', error);
			reconnect();
		})
		this.stream.on('end', (...args:any) => {
			this.verbose && this.log('stream:end', ...args);
			reconnect();
		})
	}

	disconnect() {
		if(this.reconnect_dpc) {
			clearDPC(this.reconnect_dpc);
			delete this.reconnect_dpc;
		}
		this.reconnect = false;
		this.stream && this.stream.end();
		this.clearPending();
	}

	clearPending() {
		Object.keys(this.pending).forEach(key => {
			let list = this.pending[key];
			list.forEach(o=>o.reject('closing by force'));
			this.pending[key] = [];
		});
	}

	close() {
		this.disconnect()
	}

	createStream() {
		if(!this.client)
			return null;
		const stream = this.client.MessageStream(()=>{
		});
		//console.log("stream", stream)
		return stream;
	}

	initIntake(stream:IStream) {
		stream.on('data', (data:any) => {
			//this.log("stream:data", data)
			if(data.payload) {
				let name = data.payload;
				let payload = data[name];
				let ident = name.replace(/^get|Response$/ig,'').toLowerCase();
				this.handleIntake({name, payload, ident });
			}
		});
	}

	handleIntake(o:IData) {
		if(this.intakeHandler) {
			this.intakeHandler(o);
		} else {
			let handlers = this.pending[o.name];
			this.verbose && console.log('intake:',o,'handlers:',handlers);
			if(handlers && handlers.length){
				let pending:QueueItem|undefined = handlers.shift();
				if(pending)
					pending.resolve(o.payload);
			}

			let subscribers:SubscriberItem[]|undefined = this.subscribers.get(o.name);
			if(subscribers){
				subscribers.map(subscriber=>{
					subscriber.callback(o.payload)
				})
			}
		}
	}

	setIntakeHandler(fn:Function) {
		this.intakeHandler = fn;
	}

	post(name:string, args:any={ }) {
		if(!this.stream)
			return false;

		let req = {
			[name]:args
		}
		this.verbose && this.log('post:',req);
		this.stream.write(req);

		return true;
	}

	call(method:string, data:any) {
		this.verbose && this.log('call to', method);
		if(!this.client)
			return Promise.reject('not connected');

		return new Promise((resolve, reject) => {
			let stream = this.stream;
			if(!stream) {
				this.verbose &&  this.log('could not create stream');
				return reject('not connected');
			}

			const resp = method.replace(/Request$/,'Response');
			if(!this.pending[resp])
				this.pending[resp] = [];
			let handlers:QueueItem[] = this.pending[resp];
			handlers.push({method, data, resolve, reject});

			this.post(method, data);
		})
	}

	subscribe<T>(subject:string, data:any={}, callback:Function):Rpc.SubPromise<T>{
		if(typeof data == 'function'){
			callback = data;
			data = {};
		}

		this.verbose && this.log('subscribe to', subject);
		if(!this.client)
			return Promise.reject('not connected') as Rpc.SubPromise<T>;

		let eventName = subject.replace("notify", "").replace("Request", "Notification")
		eventName = eventName[0].toLowerCase()+eventName.substr(1);
		console.log("subscribe:eventName", eventName)

		let subscribers:SubscriberItem[]|undefined = this.subscribers.get(eventName);
		if(!subscribers){
			subscribers = [];
			this.subscribers.set(eventName, subscribers);
		}
		let uid = (Math.random()*100000 + Date.now()).toFixed(0);
		subscribers.push({uid, callback});

		let p = this.call(subject, data) as Rpc.SubPromise<T>;

		p.uid = uid;
		return p;
	}

}
