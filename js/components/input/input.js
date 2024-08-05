import {styles} from "./input.styles.js";

const generateTemplateClone = (name) => {
    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <input type="text" name="${name}"/>
    `;

    return template.content.cloneNode(true);
}

class Input extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    render() {
        const name = this.getAttribute('name');
        const clone = generateTemplateClone(name);
        this.append(clone);
    }
}

customElements.define('custom-input', Input);
// customElements.define('custom-input', Input, {extends: 'input'});
