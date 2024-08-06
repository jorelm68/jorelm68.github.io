import constants from "./constants";
import api from "./api";

// <><><><><><><><><><CANCELLATION TOKEN><><><><><><><><><><><><><>
class CancellationToken {
    isCancelled: boolean;
    cancelHandlers: (() => void)[];

    constructor() {
        this.isCancelled = false;
        this.cancelHandlers = [];
    }

    cancel() {
        this.isCancelled = true;
        this.invokeCancelHandlers();
    }

    registerCancelHandler(handler: () => void) {
        this.cancelHandlers.push(handler);
    }

    invokeCancelHandlers() {
        for (const handler of this.cancelHandlers) {
            handler();
        }
    }
}
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

class Cache {
    static instance: Cache;
    cache!: Map<string, any>;
    requests!: { [key: string]: Promise<string | undefined> };
    putLocks!: Map<string, CancellationToken>;

    constructor() {
        if (Cache.instance) {
            return Cache.instance;
        }

        this.cache = new Map();
        this.requests = {};
        this.putLocks = new Map();

        Cache.instance = this;
    }

    key(model: string, id: string, field: string = ''): string {
        return `${model}->${id}${field ? `->${field}` : ''}`;
    }

    async get(photo: string, resolution: number): Promise<string | undefined> {
        const key = this.key(photo, resolution.toString());
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        } else {
            if (this.requests[key] !== undefined) {
                return this.requests[key];
            }

            const fetch = new Promise<string | undefined>(async (resolve, reject) => {
                try {
                    const response: any = await api.photo.readPhoto(photo, resolution);

                    if (response.success) {
                        const data = response.data.uri;
                        this.put(key, data);
                        resolve(data);
                    } else {
                        reject(new Error(response.error));
                    }
                } catch (error) {
                    reject(error);
                }
                delete this.requests[key];
            });

            this.requests[key] = fetch;

            try {
                const data = await fetch;
                return data;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }
    }

    put(key: string, value: any) {
        this.cache.delete(key);
        this.cache.set(key, value);

        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= constants.CACHE_CAPACITY) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    delete(key: string) {
        this.cache.delete(key);
    }

    filter(fieldsToMatch: string[]) {
        for (const key of this.cache.keys()) {
            if (fieldsToMatch.every(field => key.includes(field))) {
                this.cache.delete(key);
            }
        }
    }

    clear() {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }
}

export default new Cache();
