(() => {
    const id = 'vl-checkbox-style';
    addStyle();

    function addStyle() {
        if (!document.head.querySelector('#' + id)) {
            var style = getStyle();
            document.head.appendChild(style);
        }
    }

    function getStyle() {
        var link = document.createElement('link');
        link.setAttribute('id', id);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', '../style.css');
        return link;
    }

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
          @import '../style.css';
        </style>

        <label class="vl-checkbox" for="checkbox">
            <input class="vl-checkbox__toggle" type="checkbox" id="checkbox" name="checkbox"/>
            <div class="vl-checkbox__label">
                <i class="vl-checkbox__box" aria-hidden="true"></i>
            </div>
        </label>
    `;

    /**
     * `vl-checkbox``
     * De checkbox laat de gebruiker toe om een of meerdere opties te selecteren uit een lijst. Gebruik de checkbox in formulieren.
     * 
     * @demo demo/vl-checkbox.html
     */
    class VlCheckbox extends HTMLElement {
        static get attributes() {
            return ['label', 'value', 'checked'];
        }

        static get classAttributes() {
            return ['block', 'single', 'disabled', 'error', 'switch'];
        }

        static get observedAttributes() {
            return VlCheckbox.attributes.concat(VlCheckbox.classAttributes);
        }

        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ 'mode': 'open' });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._labelElement = this._shadowRoot.querySelector('.vl-checkbox');
            this._inputElement = this.shadowRoot.querySelector('input');
            this._checkboxLabelElement = this._labelElement.querySelector('.vl-checkbox__label');
        }

        connectedCallback() {
            this.classList.add('vl-checkbox');
            this._inputElement.onchange = this._toggle;
        }

        attributeChangedCallback(attrName, oldVal, newVal) {
            if (oldVal != newVal) {
                VlCheckbox.classAttributes.filter(attribute => {
                    return attribute == attrName;
                }).forEach(attribute => {
                    if (this.getAttribute(attribute) != null) {
                        this._labelElement.classList.add('vl-checkbox--' + attribute);
                    } else {
                        this._labelElement.classList.remove('vl-checkbox--' + attribute);
                    }
                });

                switch (attrName) {
                    case 'label':
                        this._labelChangedCallback(newVal);
                        break;
                    case 'value':
                        this._valueChangedCallback(newVal);
                        break;
                    case 'checked':
                        this._checkedChangedCallback(newVal);
                        break;
                    case 'disabled':
                        this._disabledChangedCallback(newVal);
                        break;
                    case 'single':
                        this._singleChangedCallback(newVal);
                        break;
                    default:
                        break;
                }
            }
        }

        toggle() {
            this._inputElement.click();
        }

        _toggle() {
            let checked;
            const parent = this.getRootNode().host;
            if (parent._checked && Array.isArray(parent._checked)) {
                const value = JSON.parse(this.value);
                if (parent._checked.indexOf(value) > -1) {
                    parent._checked.splice(parent._checked.indexOf(value), 1);
                } else {
                    parent._checked.push(value);
                }
                checked = parent._checked;
                parent.setAttribute('checked', JSON.stringify(checked));
            } else {
                checked = this.checked;
            }
            this.dispatchEvent(new CustomEvent('input', { detail: checked }));
        }

        _labelChangedCallback(value) {
            this._label = value;
            this._checkboxLabelElement.append(this._label);
        }

        _valueChangedCallback(value) {
            this._inputElement.value = value;
        }

        _checkedChangedCallback(value) {
            try {
                this._checked = JSON.parse(value);
            } catch (error) {
                this._checked = value != undefined;
            }

            if (!Array.isArray(this._checked)) {
                this._inputElement.checked = this._checked;
            } else if (this._checked.indexOf(JSON.parse(this._inputElement.value)) > -1) {
                this._inputElement.checked = true;
            }
        }

        _disabledChangedCallback(value) {
            this._inputElement.disabled = value != undefined;
        }

        _singleChangedCallback() {
            [... this._checkboxLabelElement.childNodes].filter(this._isTextNode).forEach(this._removeNode);
            const span = document.createElement('span');
            span.classList.add('vl-u-visually-hidden');
            span.textContent = this._label;
            this._checkboxLabelElement.appendChild(span);
        }

        _isTextNode(node) {
            return node.nodeType === 3;
        }

        _removeNode(node) {
            node.remove();
        }
    }

    customElements.define('vl-checkbox', VlCheckbox);
})();