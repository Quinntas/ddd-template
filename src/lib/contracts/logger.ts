export abstract class Logger {
    abstract debug<T>(obj: T): void

    abstract info<T>(obj: T, ...args: any[]): void

    abstract error<T extends Error>(obj: T, ...args: any[]): void

    abstract warn<T>(obj: T, ...args: any[]): void
}