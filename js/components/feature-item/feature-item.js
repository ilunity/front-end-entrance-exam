import {styles} from "./feature-item.styles.js";

const template = document.createElement("template");
template.innerHTML = `
    ${styles}
    <li class="feature-item">
        <span class="feature-item__content"><slot></slot></span>
        <span class="feature-item__remove">&times;</span>
    </li>          
`;

class FeatureItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
            this.featureIndex = this.getAttribute('featureindex');
        }
    }

    remove() {
    }

    render() {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.feature-item__remove').addEventListener(
            'click',
            () => this.dispatchEvent(new CustomEvent("remove", {
                detail: {index: this.featureIndex}
            }))
        );

        this.shadowRoot.append(clone);
    }
}

customElements.define('feature-item', FeatureItem);
