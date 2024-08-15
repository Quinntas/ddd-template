import {EventEmitter, OnMessageFunction} from "../../../lib/contracts/eventEmitter";

export class RabbitmqAdapter extends EventEmitter {
    constructor(uri: string) {
        super();
    }

    connect(): Promise<void> {
        return Promise.resolve(undefined);
    }

    consume<T>(queueName: string, onMessage: OnMessageFunction<T>): Promise<void> {
        return Promise.resolve(undefined);
    }

    send<T>(queueName: string, msg: T): Promise<void> {
        return Promise.resolve(undefined);
    }

}