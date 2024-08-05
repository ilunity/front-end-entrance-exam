import {styles} from "./modal.styles.js";

const generateContent = (open=false) => {
    const openClass = open ? 'modal_open' : '';

    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <div class="modal ${openClass}">
            <div class="modal__content">
                <div class="modal__header">
                    <slot name="header"></slot>
                    <span class="close">&times;</span>
                </div>
                <div class="modal__body">
                    <slot></slot>
                </div>
                <div class="modal__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    `;

    return template.content.cloneNode(true);
}

class Modal extends HTMLElement {
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

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    close() {
        this.setAttribute('open', 'false');
        this.modalElement.classList.remove('modal_open');
    }

    render() {
        this.shadowRoot.innerHTML = "";

        const open = this.getAttribute('open') === 'true';
        const clone = generateContent(open);

        this.modalElement = clone.querySelector('.modal');
        clone.querySelector('.close').addEventListener('click', () => this.close());

        this.shadowRoot.appendChild(clone);
    }
}

customElements.define('custom-modal', Modal);
