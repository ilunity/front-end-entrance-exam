import {Storage} from './storage.js'

const initValue = ['branding', 'design', 'photography', 'artificial intelligence', 'illustration', 'typography', 'social networks', 'research', 'dron pilot', 'games'];

class InterestsStorage extends Storage {
    constructor() {
        super('interests', initValue);
    }
}

export const interestsStorage = new InterestsStorage();
