import {Storage} from './storage.js'

export class Profile {
    constructor({greeting, name, role}) {
        this.greeting = greeting;
        this.name = name;
        this.role = role;
    }
}

const initValue = new Profile({
    greeting: 'Hello 👋🏻 I’m',
    name: 'Karthik SR',
    role: 'UX/UI Designer',
});

class ProfileStorage extends Storage {
    constructor() {
        super('profile', initValue);
    }
}

export const profileStorage = new ProfileStorage();
