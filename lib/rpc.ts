import {Client} from './client';
import {IRPC, Api} from '../types/custom-types';

export class RPC implements IRPC{
	client:Client;
	constructor(options:any={}){
		if(options.client){
			this.client = options.client;
		}else{
			this.client = new Client(options.clientConfig||{});
		}
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
	getUtxos(address:string, limit:number, skip:number): Promise<Api.Utxo[]>{
		return this.request('getUTXOsByAddressRequest', {address, limit, skip}) as  Promise<Api.Utxo[]>;
	}
	postTx(transactionHex: string): Promise<Api.SuccessResponse>{
		return this.request('submitTransactionRequest', {transactionHex}) as  Promise<Api.SuccessResponse>;
	}
}