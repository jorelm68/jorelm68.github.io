// import { CAPACITY } from '@env'

import { Res } from "../constants/types";
import api from "./api";

const CAPACITY = 500;

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
    requests!: { [key: string]: () => Promise<Res> };
    putLocks!: Map<string, CancellationToken>;

    constructor() {
        if (Cache.instance) {
            return Cache.instance; // Return the existing instance if it already exists
        }

        this.cache = new Map(); // Map to store cached data
        this.requests = {}; // Object to store ongoing requests
        this.putLocks = new Map(); // Map to store cancellation tokens for PUT requests

        Cache.instance = this; // Save the instance to a static property
    }

    // Generates a unique cache key based on model name, identifier, and field
    key(model: string, id: string, field: string = ''): string {
        return `${model}->${id}${field ? `->${field}` : ''}`;
    }

    // Retrieve data from cache or fetch from backend if not available
    async get(photo: string, resolution: number): Promise<string> {
        const key = this.key(photo, resolution.toString());
        if (this.cache.has(key)) {
            // Cache hit - Move the key to the end to mark it as most recently used
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        } else {
            if (this.requests[key] !== undefined) {
                // Cache miss but ongoing request for the same data - return the promise
                const fetch = this.requests[key]; // Await the promise to get the retrieved data
                const res: Res = await fetch();
                return res.data;
            }

            // Cache miss and no ongoing request - create a new promise for data retrieval
            const fetch = async (): Promise<Res> => {
                // Fetch data from the backend
                const res: Res = await api.photo.readPhoto(photo, resolution);

                if (res.success) {
                    console.log(res);
                    const data = res.data;
                    console.log(res.data);
                    // Cache the retrieved data
                    this.put(key, data);
                }

                delete this.requests[key]; // Remove the request from the requests object
                return res;
            }

            // Store the promise in the requests object
            this.requests[key] = fetch;

            // Await the promise to get the retrieved data
            const res: Res = await fetch();
            return res.data;
        }
    }

    // Put data in the cache and optionally update the backend
    put(key: string, value: any) {
        // First, delete the key-value pair from the cache.
        this.cache.delete(key);

        // Then, add the updated key-value pair to the cache.
        this.cache.set(key, value);

        // Then, make a request to store the new data on the back-end
        if (this.cache.has(key)) {
            // If the key already exists, get rid of it
            this.cache.delete(key);
        } else if (this.cache.size >= CAPACITY) {
            // If the cache is full, remove the least recently used item (the first key)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        // Add the key-value pair to the end
        this.cache.set(key, value);
    }

    // Delete an item from the cache
    delete(key: string) {
        this.cache.delete(key);
    }

    // Filter any key that contains the string and delete it
    filter(fieldsToMatch: string[]) {
        for (const key of this.cache.keys()) {
            if (fieldsToMatch.every(field => key.includes(field))) {
                this.cache.delete(key);
            }
        }
    }

    // Clear the entire cache
    clear() {
        this.cache.clear();
    }

    // Get the current size of the cache
    size(): number {
        return this.cache.size;
    }
}

const cache = new Cache();

export default cache;