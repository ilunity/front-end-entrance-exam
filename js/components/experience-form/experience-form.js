import {Experience, experiencesStorage} from "../../storage/experiences.js";

const template = document.createElement('template');
template.innerHTML = `
    <label is="custom-label">
        <span>Date</span>
        <custom-input name="date" required></custom-input>
    </label>
    <label is="custom-label">
        Role
        <custom-input name="role"></custom-input>
    </label>
    <label is="custom-label">
        Company
        <custom-input name="company"></custom-input>
    </label>
    <label is="custom-label">
        Info
        <custom-input name="info"></custom-input>
    </label>
    <label is="custom-label">
        Features
        <features-input></features-input>
    </label>
    <button is="custom-button" type="submit">
        Apply
    </button>
`

class ExperienceForm extends HTMLFormElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.experienceIndex = this.getAttribute('experienceindex');
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
        formProps.features = this.featuresInput.value;
        formProps.mostRecent = experiencesStorage.get()[+this.experienceIndex].mostRecent;

        experiencesStorage.changeItem(
            this.experienceIndex,
            new Experience(formProps)
        )
    }

    initValues() {
        const {mostRecent, features, ...experiences} = experiencesStorage.get()[+this.experienceIndex];
        Object.entries(experiences).map(([k, v]) => {
            this[k].value = v;
        })

        this.featuresInput.value = features;
    }

    render() {
        const clone = template.content.cloneNode(true);
        this.featuresInput = clone.querySelector('features-input');
        this.append(clone);
    }
}

customElements.define('experience-form', ExperienceForm, {extends: 'form'});
