import {Storage} from './storage.js'

export class Contact {
    constructor({title, content}) {
        this.title = title;
        this.content = content;
    }
}

const initValue = new Contact({
    title: 'Let´s chat! I´m ready to work on excinting projects',
    content: 'srkarthik.designscape@gmail.com',
});

class ContactStorage extends Storage {
    constructor() {
        super('contact', initValue);
    }
}

export const contactStorage = new ContactStorage();
