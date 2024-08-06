// import { CAPACITY } from '@env'

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
    requests!: { [key: string]: Promise<string | undefined> };
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
    async get(photo: string, resolution: number): Promise<string | undefined> {
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
                return this.requests[key];
            }

            // Cache miss and no ongoing request - create a new promise for data retrieval
            const fetch = new Promise<string | undefined>(async (resolve, reject) => {
                try {
                    // Fetch data from the backend
                    const response: any = await api.photo.readPhoto(photo, resolution);

                    if (response.success) {
                        const data = response.data.uri;
                        // Cache the retrieved data and resolve the promise with it
                        this.put(key, data);
                        resolve(data);
                    } else {
                        // Reject the promise with the error message
                        reject(new Error(response.error));
                    }
                } catch (error) {
                    // Reject the promise with any other error that occurred
                    reject(error);
                }

                // Remove the request from requests once resolved or rejected
                delete this.requests[key];
            });

            // Store the promise in the requests object
            this.requests[key] = fetch;

            try {
                // Await the promise to get the retrieved data
                const data = await fetch;
                return data;
            } catch (error) {
                // Handle the error here or propagate it to the calling code
                console.error(error);
                return undefined;
            }
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

export default new Cache();
