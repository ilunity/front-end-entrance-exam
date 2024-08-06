import {styles} from "./box.styles.js";

const generateContent = () => {
    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <div class="box">
            <div class="box__inner">
                <div class="box__title">
                    <slot name="title"></slot>
                </div>
                <div class="box__content">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    `;

    return template.content.cloneNode(true);
}

class Box extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    render() {
        const clone = generateContent();
        this.shadowRoot.append(clone);
    }
}

customElements.define('custom-box', Box);
