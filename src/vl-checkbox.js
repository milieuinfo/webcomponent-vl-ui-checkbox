import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';

/**
 * VlCheckbox
 * @class
 * @classdesc De checkbox laat de gebruiker toe om een of meerdere opties te selecteren uit een lijst. Gebruik de checkbox in formulieren.
 *
 * @extends HTMLElement
 * @mixesvlElement
 *
 * @property {boolean} data-vl-block - Attribuut wordt gebruikt om ervoor te zorgen dat de checkbox getoond wordt als een block element en bijgevol de breedte van de parent zal aannemen.
 * @property {boolean} data-vl-error - Attribuut wordt gebruikt om aan te duiden dat de checkbox verplicht is.
 * @property {boolean} data-vl-disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker de checkbox kan selecteren.
 * @property {boolean} data-vl-single - Attribuut wordt gebruikt om alleen een checkbox te tonen zonder label.
 * @property {boolean} data-vl-switch - Attribuut wordt gebruikt om een checkbox variant te genereren met de stijl van een switch.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-checkbox/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-checkbox/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-checkbox.html|Demo}
 */
export class VlCheckbox extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['label', 'value', 'checked'];
  }

  static get _observedChildClassAttributes() {
    return ['block', 'single', 'disabled', 'error', 'switch'];
  }

  constructor() {
    super(`
      <style>
        @import '/src/style.css';
      </style>

      <label id="label" class="vl-checkbox" for="checkbox">
        <input class="vl-checkbox__toggle" type="checkbox" id="checkbox" name="checkbox"/>
        <div class="vl-checkbox__label">
          <i class="vl-checkbox__box" aria-hidden="true"></i>
          <span>
            <slot></slot>
          </span>
        </div>
      </label>
    `);
  }

  connectedCallback() {
    this._inputElement.onchange = this._toggle;
    this._inputElement.oninput = (event) => event.stopPropagation();
  }

  /**
   * Geeft de waarde van het checkbox input element.
   *
   * @return {boolean}
   */
  get checked() {
    return this._inputElement.checked;
  }

  /**
   * Zet de waarde van het checkbox input element.
   *
   * @param {boolean} value
   */
  set checked(value) {
    this._inputElement.checked = value;
  }

  /**
   * Triggert een toggle van de checkbox zonder te klikken op de checkbox.
   *
   * @return {void}
   */
  toggle() {
    this._inputElement.click();
  }

  get _isSingle() {
    return this.hasAttribute('single');
  }

  get _classPrefix() {
    return 'vl-checkbox--';
  }

  get _inputElement() {
    return this._element.querySelector('input');
  }

  get _labelElement() {
    return this._element.querySelector('.vl-checkbox__label span');
  }

  get _labelSlotElement() {
    return this._element.querySelector('slot');
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
      parent.setAttribute('data-vl-checked', JSON.stringify(checked));
    } else {
      checked = this.checked;
    }
    parent.dispatchEvent(new CustomEvent('input', {detail: this.checked, bubbles: true, composed: true}));
  }

  _labelChangedCallback(oldValue, newValue) {
    this._labelSlotElement.textContent = newValue;
  }

  _valueChangedCallback(oldValue, newValue) {
    this._inputElement.value = newValue;
  }

  _checkedChangedCallback(oldValue, newValue) {
    try {
      this._checked = JSON.parse(newValue);
    } catch (error) {
      this._checked = newValue != undefined;
    }

    if (!Array.isArray(this._checked)) {
      this._inputElement.checked = this._checked;
    } else if (this._checked.indexOf(JSON.parse(this._inputElement.value)) > -1) {
      this._inputElement.checked = true;
    }
  }

  _disabledChangedCallback(oldValue, newValue) {
    this._inputElement.disabled = newValue != undefined;
  }

  _singleChangedCallback(oldValue, newValue) {
    this._toggleClass(this._labelElement, newValue, 'vl-u-visually-hidden');
  }

  _isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
  }

  _removeNode(node) {
    node.remove();
  }
}

define('vl-checkbox', VlCheckbox);
