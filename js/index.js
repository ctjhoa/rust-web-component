
import("../crate/pkg")
    .then(module => import("./js-custom-element.js"))
    .then(({ JsCustomElement }) => {
        window.customElements.define('js-custom-element', JsCustomElement);
        let elm = document.createElement('js-custom-element');
        let containers = {
            0: document.getElementById('container1'),
            1: document.getElementById('container2')
        };
        let lastContainer = document.getElementById('last-container');
        let count = 0;

        document.body.insertBefore(elm, containers[1]);
        let intervalID = window.setInterval(() => {
            let container = containers[count % 2];
            document.body.insertBefore(elm, container);
            count++;
            if (count === 4) {
                window.clearInterval(intervalID);
                elm.remove();
                let elm2 = document.createElement('js-custom-element');
                lastContainer.appendChild(elm2);
            }
        }, 2000);
    });
