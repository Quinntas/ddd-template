import {Logger} from "../../../lib/contracts/logger";

export class LoggerAdapter extends Logger {
    debug<T>(obj: T): void {
    }

    error<T extends Error>(obj: T, ...args: any[]): void {
    }

    info<T>(obj: T, ...args: any[]): void {
    }

    warn<T>(obj: T, ...args: any[]): void {
    }

}