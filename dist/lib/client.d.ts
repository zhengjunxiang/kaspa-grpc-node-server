import { PendingReqs, IData, IStream, ServiceClientConstructor, KaspadPackage } from '../types/custom-types';
export declare class Client {
    stream: IStream;
    options: any;
    pending: PendingReqs;
    intakeHandler: Function | undefined;
    reconnect: boolean;
    client: any | undefined;
    reconnect_dpc: number | undefined;
    verbose: boolean;
    log: Function;
    proto: KaspadPackage | undefined;
    constructor(options: any);
    getServiceClient(): ServiceClientConstructor;
    connect(): void;
    disconnect(): void;
    clearPending(): void;
    close(): void;
    createStream(): any;
    initIntake(stream: IStream): void;
    handleIntake(o: IData): void;
    setIntakeHandler(fn: Function): void;
    post(name: string, args?: any): boolean;
    call(method: string, data: any): Promise<unknown>;
}
//# sourceMappingURL=client.d.ts.map