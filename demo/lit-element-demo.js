import {
  html,
  LitElement
} from 'https://unpkg.com/lit-element@latest/lit-element.js?module';
import {define} from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-modal/vl-modal.js';
import '../vl-checkbox.src.js';

export class LitElementDemo extends LitElement {

  static get properties() {
    return {
      hide: {type: Boolean}
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
    customElements.whenDefined('vl-checkbox').then(() => {
      console.log('checkbox is ready to be used!');
    });
  }

  render() {
    return html`${this.renderComponent()} <button @click="${this.buttonClick}">Open Modal</button>`;
  }

  buttonClick() {
    this.shadowRoot.querySelector("vl-modal[id=\"modal-checkbox-demo\"]").open()
  }

  renderComponent() {
      return html`<vl-modal data-title="Modal 7" id="modal-checkbox-demo"><vl-checkbox slot="content"
        id="id-element"
        label="label"
        block
        @input="${this._changeBooleanValue}"></vl-checkbox></vl-modal>`;
  }

  _changeBooleanValue(e) {
    console.log("dees werkt");
  }
}

define('lit-element-demo', LitElementDemo);