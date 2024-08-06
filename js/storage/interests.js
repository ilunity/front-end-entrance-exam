import {Storage} from './storage.js'

const initValue = ['branding', 'design', 'photography', 'artificial intelligence', 'illustration', 'typography', 'social networks', 'research', 'dron pilot', 'games'];

class InterestsStorage extends Storage {
    constructor() {
        super('interests', initValue);
    }

    changeItem(index, item) {
        const newValue = this.get().map(i => i);
        newValue[index] = item;
        this.set(newValue);
    }
}

export const interestsStorage = new InterestsStorage();
