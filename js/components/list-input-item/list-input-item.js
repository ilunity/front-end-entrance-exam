import {styles} from "./list-input-item.styles.js";

const template = document.createElement("template");
template.innerHTML = `
    ${styles}
    <li class="list-input-item">
        <span class="list-input-item__content"><slot></slot></span>
        <span class="list-input-item__remove-btn">&times;</span>
    </li>          
`;

class ListInputItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
            this.index = this.getAttribute('index');
        }
    }

    remove() {
    }

    render() {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.list-input-item__remove-btn').addEventListener(
            'click',
            () => this.dispatchEvent(new CustomEvent("remove", {
                detail: {index: this.index}
            }))
        );

        this.shadowRoot.append(clone);
    }
}

customElements.define('list-input-item', ListInputItem);
