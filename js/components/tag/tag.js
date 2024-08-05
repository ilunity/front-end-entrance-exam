import {styles} from "./tag.styles.js";

const template = document.createElement('template');
template.innerHTML = `
    ${styles}
    <span class="tag">#<slot></slot></span>    
`

class Tag extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }


    render() {
        const clone = template.content.cloneNode(true);
        this.shadowRoot.append(clone);
    }
}

customElements.define('custom-tag', Tag);
