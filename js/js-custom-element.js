import { RustCustomElement } from "../crate/pkg";

export class JsCustomElement extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({mode: 'open'});
        this.div = document.createElement('div');
        this.shadow.appendChild(this.div);
    }

    connectedCallback() {
        if (this.state) {
            window.cancelIdleCallback(this.idleId);
        } else {
            this.state = new RustCustomElement();
        }
        let updateIntervalId = window.setInterval(() => {
            if (!this.state) {
                window.clearInterval(updateIntervalId);
                return;
            }
            this.state.inc_contents();
            this.updateValue();
        }, 100);
        this.updateValue();
    }

    disconnectedCallback() {
        this.idleId = window.requestIdleCallback(() => {
            const state = this.state;
            this.state = null;
            state.free();
        });
    }

    updateValue() {
        this.div.textContent = this.state.get_contents();
    }
}
