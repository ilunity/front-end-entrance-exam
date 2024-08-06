import {styles} from "./interests-box.styles.js";
import {interestsStorage} from "../../storage/interests.js";

const generateContent = (interests) => {
    const template = document.createElement('template');

    template.innerHTML = `
        <custom-modal class="modal" open="false">
            <span slot="header">Change interests</span>
            <form is="interests-form"></form>
        </custom-modal>
        <custom-box>
            ${styles}
            <span slot="title">Interests</span>
            <interests-container slot="content" cc="dsf" interests='${JSON.stringify(interests)}'></interests-container>
        </custom-box>
    `;

    return template.content.cloneNode(true);
};


class InterestsBox extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render(interestsStorage.get());
            this.rendered = true;
        }
        interestsStorage.subscribe(this.render.bind(this));
    }

    render(interests) {
        this.shadowRoot.innerHTML = "";
        const clone = generateContent(interests);

        this.modal = clone.querySelector('.modal');
        clone.querySelector('custom-box').addEventListener('click', () => {
            this.modal.setAttribute('open', 'true');
        });
        this.shadowRoot.append(clone);
    }
}

customElements.define('interests-box', InterestsBox);
