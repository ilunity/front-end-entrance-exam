import {Education, educationsStorage} from "../../storage/educations.js";

const template = document.createElement('template');
template.innerHTML = `
    <label is="custom-label">
        Date
        <custom-input name="date" required></custom-input>
    </label>
    <label is="custom-label">
        Name
        <custom-input name="name"></custom-input>
    </label>
    <label is="custom-label">
        Tags
        <features-input></features-input>
    </label>
    <label is="custom-label">
        School
        <custom-input name="school"></custom-input>
    </label>
    <button is="custom-button" type="submit">
        Apply
    </button>
`

class EducationForm extends HTMLFormElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.educationIndex = this.getAttribute('educationindex');
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
        formProps.tags = this.featuresInput.value;
        formProps.mostRecent = educationsStorage.get()[+this.educationIndex].mostRecent;

        educationsStorage.changeItem(
            this.educationIndex,
            new Education(formProps)
        )
    }

    initValues() {
        const {mostRecent, tags, ...education} = educationsStorage.get()[+this.educationIndex];
        Object.entries(education).map(([k, v]) => {
            this[k].value = v;
        })

        this.featuresInput.value = tags;
    }

    render() {
        const clone = template.content.cloneNode(true);
        this.featuresInput = clone.querySelector('features-input');
        this.append(clone);
    }
}

customElements.define('education-form', EducationForm, {extends: 'form'});
