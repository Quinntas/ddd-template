import {Cache, CacheTypes} from "../../../lib/contracts/cache";

export class RedisAdapter extends Cache {
    constructor(uri: string) {
        super();
    }

    delete(key: string): Promise<number> {
        throw new Error('Method not implemented.');
    }

    get(key: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    set(key: string, value: CacheTypes, tokenExpiryTime: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}