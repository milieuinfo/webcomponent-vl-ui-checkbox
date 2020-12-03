const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlCheckbox extends VlElement {
  async click() {
    await this.hover();
    const label = await this._getLabel();
    await this.driver.actions().move({origin: label}).click().perform();
  }

  async getLabel() {
    const label = await this._getLabelSlot();
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
    return this._hasClass('vl-checkbox--switch__wrapper');
  }

  async isDisabled() {
    return this._hasClass('vl-checkbox--disabled');
  }

  async _getLabel() {
    const isSwitch = await this.isSwitch();
    if (isSwitch) {
      return this.shadowRoot.findElement(By.css('.vl-checkbox--switch__label'));
    } else {
      return this.shadowRoot.findElement(By.css('.vl-checkbox__label'));
    }
  }

  async _getLabelSlot() {
    const label = await this._getLabel();
    return label.findElement(By.css('slot'));
  }

  async _getInput() {
    return this.shadowRoot.findElement(By.css('#checkbox'));
  }

  async _hasClass(clazz) {
    return this.shadowRoot.hasClass(clazz);
  }
}

module.exports = VlCheckbox;
