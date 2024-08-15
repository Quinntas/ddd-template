import {EventEmitter} from "../contracts/eventEmitter";
import {Logger} from "../contracts/logger";

export abstract class Event<T> {
    protected constructor(
        private eventEmitter: EventEmitter,
        private logger: Logger,
        private readonly queueName: string = '@domain-event'
    ) {
        this.eventEmitter = eventEmitter
        this.queueName = queueName
        this.logger = logger
    }

    abstract handle(msg: T | null): Promise<void>

    async pub(data: T): Promise<void> {
        return this.eventEmitter.send(this.queueName, data)
    }

    async sub(): Promise<void> {
        return this.eventEmitter.consume(this.queueName, async (msg: T | null) => {
            try {
                await this.handle(msg)
            } catch (e: unknown) {
                this.logger.error(e as Error)
            }
        })
    }
}