const template = document.createElement('template');
template.innerHTML = `
    <div class="kaa">
        <slot name="title">default</slot>
    </div>
`

class Kaa extends HTMLElement {
    constructor() {
        super();
        // const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    render() {
        const clone = template.content.cloneNode(true);
        // this.shadowRoot.append(clone);
        this.innerHTML = `
        <div class="kaa">
        <slot name="title">default</slot>
    </div>`;
    }
}

customElements.define('custom-kaa', Kaa);
