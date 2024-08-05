import {styles} from "./experience-card.styles.js";

const generateTemplateClone = (experienceIndex, mostRecent = false) => {
    const jobInfoPrimaryClass = mostRecent ? 'job-info__about_primary' : '';

    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <link href="../../../css/normalize.css" rel="stylesheet">
        <custom-modal class="modal" open="false">
            <span slot="header">Change experience card</span>
            <form is="experience-form" experienceindex="${experienceIndex}">
            </form>
        </custom-modal>
        <custom-card primary="${mostRecent}" class="experience-card">
            <span slot="title">
                <slot name="title"></slot>
            </span>
            ${mostRecent ? 
            `<div slot="action" class="tag card__action card__tag">
                most recent
            </div>` : ''}
            <div slot="content" class="experience-item__job-info job-info">
                <div class="job-info__role">
                    <slot name="role"></slot>
                </div>
                <div class="job-info__about ${jobInfoPrimaryClass}">
                    <slot name="company"></slot>
                    <slot name="info"></slot>                       
                </div>
            </div>
            <ul slot="content" class="experience-item__featured-points featured-points">
                <slot name="feature"></slot>
            </ul>
        </custom-card>
    `

    return template.content.cloneNode(true);
}

export class ExperienceCard extends HTMLElement {
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
        const experienceIndex = JSON.parse(this.getAttribute('experienceindex'));

        this.shadowRoot.innerHTML = "";
        const clone = generateTemplateClone(experienceIndex, mostRecent);

        this.modal = clone.querySelector('.modal');
        clone.querySelector('custom-card').addEventListener('click', () => {
            this.modal.setAttribute('open', 'true');
        });

        this.shadowRoot.append(clone);
    }
}

customElements.define('experience-card', ExperienceCard);
