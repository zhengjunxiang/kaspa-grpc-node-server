import { Client } from './client';
import { IRPC, Api } from '../types/custom-types';
export declare class RPC implements IRPC {
    client: Client;
    constructor(options?: any);
    request(method: string, data: any): Promise<unknown>;
    getBlock(hash: string): Promise<Api.BlockResponse>;
    getAddressTransactions(address: string, limit: number, skip: number): Promise<Api.Transaction[]>;
    getUtxos(address: string, limit: number, skip: number): Promise<Api.UTXOsByAddressResponse>;
    postTx(transactionHex: string): Promise<Api.SuccessResponse>;
}
//# sourceMappingURL=rpc.d.ts.map