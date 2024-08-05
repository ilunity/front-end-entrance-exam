import {Storage} from './storage.js'

export class Experience {
    constructor({date, role, company, info, features, mostRecent = false}) {
        this.date = date;
        this.role = role;
        this.company = company;
        this.info = info;
        this.features = features;
        this.mostRecent = mostRecent;
    }
}

const initValue = [
    new Experience({
        date: 'Jun. 2023 - Present',
        role: 'Marketing Manager',
        company: 'Pankayam',
        info: 'Full-time',
        features: [
            'Strategy development and planning of campaigns that promote the business and generate genuine traffic',
            'SEO Content Creation for Blogs, Website, Social media'
        ],
        mostRecent: true,
    }),
    new Experience({
        date: '2017 - Present',
        role: 'Graphic / Web designer',
        company: 'Freelance',
        features: [
            'Development of internal projects from scratch, product design of brands',
            'Landing page, webapps and hybrid apps',
            'Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary',
        ]
    }),
    new Experience({
        date: 'Sep. 2021 - Jun. 2023',
        role: 'Legal Assistant',
        company: 'Law Firm',
        info: 'Intern',
        features: [
            'Provide administrative support to lawyer and enhance office effectiveness',
            'Handle communication with clients, witnesses etc.',
            'repare case briefs and summarize depositions, interrogatories and testimony'
        ]
    })
];

class ExperienceStorage extends Storage {
    constructor() {
        super('experience', initValue);
    }

    changeItem(index, experience) {
        const newValue = this.get().map(i => i);
        newValue[index] = experience;
        this.set(newValue);
    }
}

export const experiencesStorage = new ExperienceStorage();
