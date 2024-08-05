import {styles} from "./button.styles.js";

const template = document.createElement("template");
template.innerHTML = `
    ${styles}
`;

class Button extends HTMLButtonElement {
    constructor() {
        super();
        this.classList.add('custom-button');
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    render() {
        const clone = template.content.cloneNode(true);
        this.append(clone);
    }
}

customElements.define('custom-button', Button, {extends: 'button'});
