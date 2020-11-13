const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlCheckbox extends VlElement {
  async click() {
    await this.hover();
    const input = await this._getInput();
    await this.driver.actions().move({origin: input}).click().perform();
  }

  async getLabel() {
    const label = await this._getLabel();
    return label.getText();
  }

  async getLabelSlotElements() {
    const slot = await this.shadowRoot.findElement(By.css('slot'));
    return this.getAssignedElements(slot);
  }

  async isChecked() {
    const input = await this._getInput();
    return this.driver.executeScript('return arguments[0].checked', input);
  }

  async isBlock() {
    return this._hasClass('vl-checkbox--block');
  }

  async isError() {
    return this._hasClass('vl-checkbox--error');
  }

  async isSingle() {
    return this._hasClass('vl-checkbox--single');
  }

  async isSwitch() {
    return this._hasClass('vl-checkbox--switch');
  }

  async isDisabled() {
    return this._hasClass('vl-checkbox--disabled');
  }

  async _getLabel() {
    return this.shadowRoot.findElement(By.css('.vl-checkbox__label slot'));
  }

  async _getInput() {
    return this.shadowRoot.findElement(By.css('#checkbox'));
  }

  async _hasClass(clazz) {
    return this.shadowRoot.hasClass(clazz);
  }
}

module.exports = VlCheckbox;
