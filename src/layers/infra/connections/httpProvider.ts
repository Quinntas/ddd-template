import {ExpressAdapter} from "../adapters/expressAdapter";
import {logger} from "./logger";

export const httpProvider = new ExpressAdapter(5000, logger)