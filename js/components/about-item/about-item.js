const template = document.createElement('template');
template.innerHTML = `
    <style>
        .job-info__about-item_divider {
            color: #000;
        }
        
        .card_primary .job-info__about,
        .card_primary .job-info__about-item_divider {
            color: #fff;
        }
    </style>
    <span class="job-info__about-item_divider">|</span>
`;


export class AboutDivider extends HTMLElement {
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
        const shadowRoot = this.attachShadow({mode: 'open'});
        const clone = template.content.cloneNode(true);
        shadowRoot.append(clone);
    }
}

customElements.define('about-divider', AboutDivider);
