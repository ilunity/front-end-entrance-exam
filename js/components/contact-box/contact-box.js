import {contactStorage} from "../../storage/contact.js";
import {styles} from "./contact-box.styles.js";

const generateContent = ({title, content}) => {
    const template = document.createElement('template');

    template.innerHTML = `
        ${styles}
        <custom-modal class="modal" open="false">
            <span slot="header">Change contact</span>
            <form is="contact-form"></form>            
        </custom-modal>
        <div class="contact-box">
            <div class="contact-box__inner">
                <div class="contact-box__title">${title}</div>
                <div class="contact-box__content">${content}</div>
            </div>
        </div>
    `;

    return template.content.cloneNode(true);
}

class ContactBox extends HTMLElement{
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render(contactStorage.get());
            this.rendered = true;
        }
        contactStorage.subscribe(this.render.bind(this));
    }

    render(contact) {
        this.shadowRoot.innerHTML = "";
        const clone = generateContent(contact);

        this.modal = clone.querySelector('.modal');
        clone.querySelector('.contact-box').addEventListener('click', () => {
            this.modal.setAttribute('open', 'true');
        });
        this.shadowRoot.append(clone);
    }
}

customElements.define('contact-box', ContactBox);
