export type CacheTypes = string | number | Buffer | null;

export abstract class Cache {
    public abstract delete(key: string): Promise<number>;

    public abstract set(
        key: string,
        value: CacheTypes,
        tokenExpiryTime: number,
    ): Promise<void>;

    public abstract get(key: string): Promise<string>;
}