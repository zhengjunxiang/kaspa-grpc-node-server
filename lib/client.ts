import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';
import { dpc, clearDPC } from '@aspectron/flow-async';
import * as gRPC from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {
	PendingReqs, IData, IStream, QueueItem, MessagesProto,
	ServiceClientConstructor
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
		const {P2P, RPC} = proto.protowire;
		return RPC;
	}

	connect() {
		this.reconnect = true;
		this.log('gRPC Client connecting to', this.options.host);
		const RPC = this.getServiceClient();
		this.client = new RPC(this.options.host, gRPC.credentials.createInsecure(),
			{ 
				// "grpc.keepalive_timeout_ms": 25000 
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
			this.log('stream:error', error);
			reconnect();
		})
		this.stream.on('end', () => {
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
		return stream;
	}

	initIntake(stream:IStream) {
		stream.on('data', (data:any) => {
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
				this.log('could not create stream');
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

}
