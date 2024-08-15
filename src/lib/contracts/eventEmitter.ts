export type OnMessageFunction<T> = (msg: T | null) => any;

export abstract class EventEmitter {
    abstract connect(): Promise<void>

    abstract send<T>(queueName: string, msg: T): Promise<void>

    abstract consume<T>(queueName: string, onMessage: OnMessageFunction<T>): Promise<void>
}