import {Contact, contactStorage} from "../../storage/contact.js";

const template = document.createElement('template');
template.innerHTML = `
    <label is="custom-label">
        Title
        <custom-input name="title"></custom-input>
    </label>
    <label is="custom-label">
        Contact
        <custom-input name="content"></custom-input>
    </label>
    <button is="custom-button" type="submit">
        Apply
    </button>
`

class ContactForm extends HTMLFormElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.addEventListener('submit', this.submit)

            this.render();
            this.initValues();
            this.rendered = true;
        }
    }

    submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);

        contactStorage.set(new Contact(formProps));
    }

    initValues() {
        const contact = contactStorage.get();
        Object.entries(contact).map(([k, v]) => {
            this[k].value = v;
        })
    }

    render() {
        const clone = template.content.cloneNode(true);
        this.append(clone);
    }
}

customElements.define('contact-form', ContactForm, {extends: 'form'});
