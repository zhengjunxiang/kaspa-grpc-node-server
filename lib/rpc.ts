import {Client} from 'kaspa-grpc';
import {IRPC, RPC as Rpc} from '../types/custom-types';

export class RPC implements IRPC{
	client:Client;
	constructor(options:any={}){
		if(options.client){
			this.client = options.client;
		}else{
			this.client = new Client(options.clientConfig||{});
			this.client.connect();
		}
	}
	disconnect(){
		this.client?.disconnect();
	}

	subscribe<T>(method:string, data:any, callback:Function){
		return this.client.subscribe<T>(method, data, callback);
	}
	request<T>(method:string, data:any){
		return this.client.call(method, data) as Promise<T>;
	}
	subscribeChainChanged(data:any, callback:Function){
		return this.subscribe<Rpc.NotifyChainChangedResponse>("notifyChainChangedRequest", data, callback);
	}
	subscribeBlockAdded(data:any, callback:Function){
		return this.subscribe<Rpc.NotifyBlockAddedResponse>("notifyBlockAddedRequest", data, callback);
	}

	getBlock(hash:string){
		return this.request<Rpc.BlockResponse>('getBlockRequest', {hash, includeBlockVerboseData:true});
	}
	getTransactionsByAddresses(startingBlockHash:string, addresses:string[]){
		return this.request<Rpc.TransactionsByAddressesResponse>('getTransactionsByAddressesRequest', {
			startingBlockHash, addresses
		});
	}
	getUtxosByAddresses(addresses:string[]){
		return this.request<Rpc.UTXOsByAddressesResponse>('getUtxosByAddressesRequest', {addresses});
	}
	submitTransaction(tx: Rpc.SubmitTransactionRequest){
		return this.request<Rpc.SubmitTransactionResponse>('submitTransactionRequest', tx);
	}
}