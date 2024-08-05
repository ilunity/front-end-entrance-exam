import {styles} from "./box-list.styles.js";

const generateContent = (direction = 'column') => {
    const template = document.createElement('template');

    template.innerHTML = `
        ${styles}
        <div class="box-list box-list_${direction}">
            <slot></slot>
        </div>
    `

    return template.content.cloneNode(true);
}

class BoxList extends HTMLElement {
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
        const direction = this.getAttribute('direction');
        const clone = generateContent(direction);
        this.shadowRoot.append(clone);
    }
}

customElements.define('box-list', BoxList);
