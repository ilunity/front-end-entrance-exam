import {styles} from "./education-card.styles.js";

const generateTemplateClone = (educationIndex, mostRecent = false) => {
    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <link href="../../../css/normalize.css" rel="stylesheet">
        <custom-modal class="modal" open="false">
            <span slot="header">Change education card</span>
            <form is="education-form" educationindex="${educationIndex}">
            </form>
        </custom-modal>
        <custom-card primary="${mostRecent}" class="education-card">
            <span slot="title">
                <slot name="date"></slot>
            </span>
            ${mostRecent 
                ? `<div slot="action" class="tag card__action card__tag">
                        <img src="../../../images/icons/like.svg">
                    </div>`
                : ''
            }
            <div slot="content">
                <div class="education-item__content">
                    <div class="education-item__name">
                        <slot name="name"></slot>
                    </div>
                    <div class="education-item__tags">
                        <slot name="tag"></slot>
                    </div>
                </div>
                <div class="education-item__action">
                    <slot name="school"></slot>
                </div>
            </div>
        </custom-card>
    `

    return template.content.cloneNode(true);
}

export class EducationCard extends HTMLElement {
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
        const mostRecent = this.getAttribute('mostrecent') === 'true';
        const educationIndex = JSON.parse(this.getAttribute('educationindex'));

        this.shadowRoot.innerHTML = "";
        const clone = generateTemplateClone(educationIndex, mostRecent);

        this.modal = clone.querySelector('.modal');
        clone.querySelector('custom-card').addEventListener('click', () => {
            this.modal.setAttribute('open', 'true');
        });

        this.shadowRoot.append(clone);
    }
}

customElements.define('education-card', EducationCard);
