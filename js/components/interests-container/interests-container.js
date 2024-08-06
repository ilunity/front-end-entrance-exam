import {styles} from "./interests-container.styles.js";

const generateContent = (interests) => {
    const template = document.createElement('template');

    template.innerHTML = `
        ${styles}
        <box-list direction="row">
            ${interests.map((item) => `
                <span class="interests__tag">${item}</span>
            `).join('')}
        </box-list>
    `;

    return template.content.cloneNode(true);
}


class InterestsContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render()
            this.rendered = true;
        }
    }

    render() {
        this.shadowRoot.innerHTML = "";
        const interests = JSON.parse(this.getAttribute('interests'));
        const clone = generateContent(interests);
        this.shadowRoot.append(clone);
    }
}

customElements.define('interests-container', InterestsContainer);
