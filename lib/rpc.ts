import {Client} from './client';
import {IRPC, Api} from '../types/custom-types';

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
	getBlock(hash:string): Promise<Api.BlockResponse>{
		return this.request('getBlockRequest', {hash, includeBlockVerboseData:true}) as Promise<Api.BlockResponse>;
	}
	getAddressTransactions(address:string, limit:number, skip:number): Promise<Api.Transaction[]>{
		return this.request('getAddressTransactions', {address, limit, skip}) as Promise<Api.Transaction[]>;
	}
	getUtxos(address:string, limit:number, skip:number): Promise<Api.UTXOsByAddressResponse>{
		return this.request('getUTXOsByAddressRequest', {address, limit, skip}) as Promise<Api.UTXOsByAddressResponse>;
	}
	postTx(tx: Api.TransactionRequest): Promise<Api.TransactionResponse>{
		return this.request('submitTransactionRequest', tx) as Promise<Api.TransactionResponse>;
	}
}