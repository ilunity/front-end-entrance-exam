import {styles} from "./list-input.styles.js";

const generateTemplateClone = (items) => {
    console.log('gen: ' + items)

    const template = document.createElement('template');
    template.innerHTML = `
        ${styles}
        <link href="../../../css/normalize.css" rel="stylesheet">
        <div class="list-input">
            <custom-input name="features"></custom-input>
            <button is="custom-button">Add</button>
        </div>
        <ul class="list-input__items">
            ${items.map((item, index) => `<list-input-item index="${index}">${item}</list-input-item>`).join('')}
        </ul>
    `;

    return template.content.cloneNode(true);
}

class ListInput extends HTMLElement {
    constructor() {
        super();
        this.listItems = [];
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    get value() {
        return this.listItems;
    }

    set value(value) {
        console.log('set: ' + value);
        this.listItems = value;
        this.render();
    }

    addItem(item) {
        this.listItems.push(item);
        this.render();
    }

    removeItem(index) {
        this.listItems.splice(+index, 1);
        this.render();
    }

    render() {
        this.innerHTML = '';
        const clone = generateTemplateClone(this.listItems);
        this.input = clone.querySelector('custom-input');
        this.input.addEventListener('change', (e) => {
            this.input.value = e.target.value;
        });

        this.button = clone.querySelector('button');
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.addItem(this.input.value);
        });

        this.append(clone);

        this.listItems = this.querySelectorAll('list-input-item');
        this.listItems.forEach(item => item.addEventListener('remove', (e) => {
            this.removeItem(e.detail.index);
        }));
    }
}

customElements.define('list-input', ListInput);
