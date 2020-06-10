const VlCheckbox = require('../components/vl-checkbox');
const {Page, Config} = require('vl-ui-core').Test;

class VlCheckboxPage extends Page {
  async _getCheckbox(selector) {
    return new VlCheckbox(this.driver, selector);
  }

  async getDefaultCheckbox(number) {
    return this._getCheckbox(`#checkbox-default-${number}`);
  }

  async getCheckboxBlock() {
    return this._getCheckbox('#checkbox-block');
  }

  async getCheckboxError() {
    return this._getCheckbox('#checkbox-error');
  }

  async getCheckboxDisabledUnchecked() {
    return this._getCheckbox('#checkbox-disabled-unchecked');
  }

  async getCheckboxDisabledChecked() {
    return this._getCheckbox('#checkbox-disabled-checked');
  }

  async getCheckboxSingle() {
    return this._getCheckbox('#checkbox-single');
  }

  async getCheckboxSwitch() {
    return this._getCheckbox('#checkbox-switch');
  }

  async getCheckboxMulti(number) {
    return this._getCheckbox(`#checkbox-multi-${number}`);
  }

  async getCheckboxMultiStandard(number) {
    return this._getCheckbox(`#checkbox-multi-st-${number}`);
  }

  async getCheckboxSlot() {
    return this._getCheckbox('#checkbox-slot-1');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-checkbox.html?no-header=true&no-footer=true');
  }
}

module.exports = VlCheckboxPage;
