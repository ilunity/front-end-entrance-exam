import {Profile, profileStorage} from "../../storage/profile.js";

const template = document.createElement('template');
template.innerHTML = `
    <label is="custom-label">
        Greeting
        <custom-input name="greeting"></custom-input>
    </label>
    <label is="custom-label">
        Name
        <custom-input name="name"></custom-input>
    </label>
    <label is="custom-label">
        Role
        <custom-input name="role"></custom-input>
    </label>
    <button is="custom-button" type="submit">
        Apply
    </button>
`

class ProfileForm extends HTMLFormElement {
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

        profileStorage.set(new Profile(formProps));
    }

    initValues() {
        const contact = profileStorage.get();
        Object.entries(contact).map(([k, v]) => {
            this[k].value = v;
        })
    }

    render() {
        const clone = template.content.cloneNode(true);
        this.append(clone);
    }
}

customElements.define('profile-form', ProfileForm, {extends: 'form'});
