import {Client} from './client';
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
	request(method:string, data:any){
		return this.client.call(method, data);
	}
	getBlock(hash:string): Promise<Rpc.BlockResponse>{
		return this.request('getBlockRequest', {hash, includeBlockVerboseData:true}) as Promise<Rpc.BlockResponse>;
	}
	getTransactionsByAddresses(startingBlockHash:string, addresses:string[]): Promise<Rpc.TransactionsByAddressesResponse>{
		return this.request('getTransactionsByAddressesRequest', {
			startingBlockHash, addresses
		}) as Promise<Rpc.TransactionsByAddressesResponse>;
	}
	getUTXOsByAddress(addresses:string[]): Promise<Rpc.UTXOsByAddressesResponse>{
		return this.request('getUTXOsByAddressRequest', {addresses}) as Promise<Rpc.UTXOsByAddressesResponse>;
	}
	submitTransaction(tx: Rpc.SubmitTransactionRequest): Promise<Rpc.SubmitTransactionResponse>{
		return this.request('submitTransactionRequest', tx) as Promise<Rpc.SubmitTransactionResponse>;
	}
}