import {educationsStorage} from "../../storage/educations.js";

const generateContent = (educations) => {
    const template = document.createElement('template');

    template.innerHTML = `
        <link href="../../../css/normalize.css" rel="stylesheet"> 
        <box-list direction="row">
            ${educations.map(({date, name, tags, school, mostRecent}, index) => `
                <education-card mostRecent="${mostRecent}" educationindex="${index}">
                    <span slot="date">${date}</span>
                    <span slot="name">${name}</span>
                    ${tags.map(i => `
                        <span slot="tag">
                            #${i}
                        </span>
                    `).join('')}
                    <span slot="school">${school}</span>
                </education-card>
            `).join('')}
        </box-list>
    `;

    return template.content.cloneNode(true);
}


class EducationsContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render(educationsStorage.get());
            this.rendered = true;
        }
        educationsStorage.subscribe(this.render.bind(this));
    }

    render(educations) {
        this.shadowRoot.innerHTML = "";
        const clone = generateContent(educations);
        this.shadowRoot.append(clone);
    }
}

customElements.define('educations-container', EducationsContainer);
