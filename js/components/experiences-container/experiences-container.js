import {experiencesStorage} from "../../storage/experiences.js";

const generateContent = (experiences) => {
    const template = document.createElement('template');

    template.innerHTML = `
        <link href="../../../css/normalize.css" rel="stylesheet"> 
        <box-list>
            ${experiences.map(({date, role, company, info, features, mostRecent}, index) => `
                <experience-card mostRecent="${mostRecent}" experienceindex="${index}">
                    <span slot="title">${date}</span>
                    <span slot="role">${role}</span>
                    <span slot="company">${company}</span>
                    ${info !== undefined 
                        ? `<span slot="info">${info}</span>` 
                        : ''
                    }
                    ${features.map(i => `
                        <li slot="feature">
                            ${i}
                        </li>
                    `).join('')}
                </experience-card>
            `).join('')}
        </box-list>
    `;

    return template.content.cloneNode(true);
}


class ExperiencesContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render(experiencesStorage.get());
            this.rendered = true;
        }
        experiencesStorage.subscribe(this.render.bind(this));
    }

    render(experiences) {
        this.shadowRoot.innerHTML = "";
        const clone = generateContent(experiences);
        this.shadowRoot.append(clone);
    }
}

customElements.define('experiences-container', ExperiencesContainer);
