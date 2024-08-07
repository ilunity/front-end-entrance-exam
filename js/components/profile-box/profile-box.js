import {profileStorage} from "../../storage/profile.js";
import {styles} from "./profile-box.styles.js";

const generateContent = ({greeting, name, role}) => {
    const template = document.createElement('template');

    template.innerHTML = `
        ${styles}
        <custom-modal class="modal" open="false">
            <span slot="header">Change profile</span>
            <form is="profile-form"></form>
        </custom-modal>
        <custom-box>
            <div slot="content" class="profile-box-container">
                <div slot="content" class="profile-box__greeting">
                    ${greeting}
                </div>    
                <div slot="content" class="profile-box__name">
                     ${name}
                </div>
                <div slot="content" class="profile-box__role">
                    ${role}
                </div>
            </div>
        </custom-box>
    `;

    return template.content.cloneNode(true);
}

class ProfileBox extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render(profileStorage.get());
            this.rendered = true;
        }
        profileStorage.subscribe(this.render.bind(this));
    }

    render(profile) {
        this.shadowRoot.innerHTML = "";
        const clone = generateContent(profile);

        this.modal = clone.querySelector('.modal');
        clone.querySelector('custom-box').addEventListener('click', () => {
            this.modal.setAttribute('open', 'true');
        });
        this.shadowRoot.append(clone);
    }
}

customElements.define('profile-box', ProfileBox);
