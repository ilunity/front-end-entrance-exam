import {cardStyles} from "./card.styles.js";

const generateTemplateClone = (primary = false) => {
    const primaryClass = primary ? 'card_primary' : '';

    const template = document.createElement('template');
    template.innerHTML = `
        ${cardStyles}
        <div class="card ${primaryClass}">
            <div class="card__top-bar">
                <div class="card__title">
                    <slot name="title"></slot>
                </div>
                <div class="tag card__tag card__action">
                    <slot name="action"></slot>
                </div>
            </div>
            <div class="card__content">
                <slot name="content"></slot>
            </div>
        </div>
    `;

    return template.content.cloneNode(true);
}

export class Card extends HTMLElement {
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
        const primary = this.getAttribute('primary') === 'true';
        this.shadowRoot.append(generateTemplateClone(primary));
    }
}

customElements.define('custom-card', Card);
