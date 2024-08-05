import {styles} from "./features-input.styles.js";

const generateTemplateClone = (features) => {
    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <link href="../../../css/normalize.css" rel="stylesheet">
        <div class="feature-input">
            <custom-input name="features"></custom-input>
            <button is="custom-button">Add</button>
        </div>
        <ul class="feature-input__points featured-points">
            ${features.map((feature, index) => `<feature-item featureindex="${index}">${feature}</feature-item>`).join('')}
        </ul>
    `;

    return template.content.cloneNode(true);
}

class FeaturesInput extends HTMLElement {
    constructor() {
        super();
        this.features = [];
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    get value() {
        return this.features;
    }

    set value(value) {
        this.features = value;
        this.render();
    }

    addFeature(feature) {
        this.features.push(feature);
        this.render();
    }

    removeFeature(featureIndex) {
        this.features.splice(+featureIndex, 1);
        this.render();
    }

    render() {
        this.innerHTML = '';
        const clone = generateTemplateClone(this.features);
        this.input = clone.querySelector('custom-input');
        this.input.addEventListener('change', (e) => {
            this.input.value = e.target.value;
        });

        this.button = clone.querySelector('button');
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.addFeature(this.input.value);
        });


        this.append(clone);

        this.featureItems = this.querySelectorAll('feature-item');
        this.featureItems.forEach(item => item.addEventListener('remove', (e) => {
            this.removeFeature(e.detail.index);
        }));
    }
}

customElements.define('features-input', FeaturesInput);
