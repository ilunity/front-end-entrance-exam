import {Storage} from './storage.js'

export class Education {
    constructor({date, name, tags,school, mostRecent = false}) {
        this.date = date;
        this.name = name;
        this.tags = tags;
        this.school = school;
        this.mostRecent = mostRecent;
    }
}

const initValue = [
    new Education({
        date: '2023',
        name: 'UI/UX',
        tags: ['UI','UX','research','DesignSystem','Ui','wireframing','figma','Ux'],
        school: 'Coursera',
        mostRecent: true,
    }),
    new Education({
        date: '2017 - 2022',
        name: 'Law',
        tags: ['law','legalStudies','legalStudies','internationalLaws'],
        school: 'University of Kerala',
    }),
    new Education({
        date: '2017',
        name: 'Graphic design',
        tags: ['branding','web','illustration','adobe'],
        school: 'Coursrea',
    }),
];

class EducationStorage extends Storage {
    constructor() {
        super('education', initValue);
    }

    changeItem(index, experience) {
        const newValue = this.get().map(i => i);
        newValue[index] = experience;
        this.set(newValue);
    }
}

export const educationsStorage = new EducationStorage();
