const { VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlCheckbox extends VlElement {
    async _getInput() {
        return this.shadowRoot.findElement(By.css('#checkbox'));
    }

    async _hasClass(clazz) {
        return this.shadowRoot.hasClass(clazz);
    }

    async getLabel() {
        return this.getText();
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
}

module.exports = VlCheckbox;
