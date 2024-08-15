import {RabbitmqAdapter} from "../adapters/rabbitmqAdapter";

export const eventEmitter = new RabbitmqAdapter(process.env.RABBITMQ_URI!);