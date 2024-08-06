import {interestsStorage} from "../../storage/interests.js";

const template = document.createElement('template');
template.innerHTML = `
    <label is="custom-label">
        Interests
        <features-input></features-input>
    </label>
    <button is="custom-button" type="submit">
        Apply
    </button>
`

class InterestsForm extends HTMLFormElement {
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
        interestsStorage.set(this.featuresInput.value);
    }

    initValues() {
        this.featuresInput.value = interestsStorage.get();
    }

    render() {
        const clone = template.content.cloneNode(true);
        this.featuresInput = clone.querySelector('features-input');
        this.append(clone);
    }
}

customElements.define('interests-form', InterestsForm, {extends: 'form'});
