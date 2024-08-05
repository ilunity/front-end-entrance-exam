import {styles} from "./label.styles.js";

const template = document.createElement('template');
template.innerHTML = `
    ${styles}
    <slot></slot>
`;

class Label extends HTMLLabelElement {
    constructor() {
        super();
        this.classList.add('custom-label');
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

customElements.define('custom-label', Label, {extends: 'label'});
