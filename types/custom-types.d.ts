import {GrpcObject, ServiceClientConstructor} from '@grpc/grpc-js/build/src/make-client';
export {ServiceClientConstructor};

export interface QueueItem{
  method:string,
  data:any,
  resolve:Function,
  reject:Function
}
export interface PendingReqs {
  [index:string]:QueueItem[];
}
export interface IData{
  name:string,
  payload:any,
  ident:string
}
export declare type IStream = any;

export interface KaspadPackage extends GrpcObject{
    RPC: ServiceClientConstructor
}

export interface MessagesProto extends GrpcObject{
    protowire: KaspadPackage
}

export namespace Api {
  interface Utxo {
    transactionId: string;
    value: number;
    scriptPubKey: string;
    acceptingBlockHash: string;
    acceptingBlockBlueScore: number;
    index: number;
    isSpent: boolean;
    isCoinbase: boolean;
    isSpendable: boolean;
    confirmations: number;
  }
  interface UtxoResponse {
    utxos: Utxo[];
  }
  interface UTXOsByAddressResponse{
    address:string;
    utxosVerboseData:Utxo[];
    error:RPCError;
  }
  interface RPCError {
    errorCode?: number;
    message: string;
  }
  interface ErrorResponse {
    errorCode: number;
    errorMessage: string;
  }
  interface SuccessResponse{
    success:boolean;
    message?:string
  }

  interface BlockResponse {
    blockHash: string;
    parentBlockHashes: string[];
    version: number;
    hashMerkleRoot: string;
    acceptedIdMerkleRoot: string;
    utxoCommitment: string;
    timestamp: number;
    bits: number;
    nonce: number;
    acceptingBlockHash: string;
    blueScore: number;
    isChainBlock: boolean;
    mass: number;
  }

  interface TransactionInput {
    previousTransactionId: string;
    previousTransactionOutputIndex: string;
    scriptSig: string;
    sequence: string;
    address: string;
  }
  interface TransactionOutput {
    value: number;
    scriptPubKey: string;
    address: string;
  }
  export interface Transaction {
    transactionId: string;
    transactionHash: string;
    acceptingBlockHash: string;
    acceptingBlockBlueScore: number;
    subnetworkId: string;
    lockTime: number;
    gas: number;
    payloadHash: string;
    payload: string;
    inputs: Array<TransactionInput>;
    outputs: Array<TransactionOutput>;
    mass: number;
    confirmations: number;
  }

  interface TransactionsResponse {
    transactions: Transaction[];
  }
  type SendTxResponse = boolean;
}

export interface IRPC {
  getBlock(blockHash:string): Promise<Api.BlockResponse>;
  getAddressTransactions(address:string, limit:number, skip:number): Promise<Api.Transaction[]>;
  getUtxos(address:string, limit:number, skip:number): Promise<Api.UTXOsByAddressResponse>;
  postTx(rawTransaction: string): Promise<Api.SuccessResponse>;
}


