export class Storage {
    subscribers = [];

    constructor(key, initValue) {
        this.key = key;
        this.storage = localStorage;

        if (!this.isEmpty()) {
            return;
        }

        this.set(initValue);
    }

    set(value) {
        this.storage.setItem(this.key, JSON.stringify(value));
        this.notify();
    }

    get() {
        return JSON.parse(this.storage.getItem(this.key));
    }

    clear() {
        this.storage.removeItem(this.key);
        this.notify();
    }

    isEmpty() {
        return this.storage.getItem(this.key) === null || this.get()?.length === 0;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify(){
        for (const subscriber of this.subscribers) {
            subscriber(this.get());
        }
    }
}
