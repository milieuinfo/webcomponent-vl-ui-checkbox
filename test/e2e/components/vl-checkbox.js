const { VlElement } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlCheckbox extends VlElement {

    async _getInput() {
        return this.shadowRoot.findElement(By.css('#checkbox'));
    }

    async _getLabel() {
        return this.shadowRoot;
    }

    async _getClass() {
        return (await this._getLabel()).getAttribute('class');
    }

    async _hasClass(clazzName) {
        return (await this._getClass()).indexOf(clazzName) > 0;
    }

    async isChecked() {
        const input = await this._getInput();
        return this.driver.executeScript('return arguments[0].checked', input);
    }

    async isError() {
        return this._hasClass('vl-checkbox--error');
    }

    async isSwitch() {
        return this._hasClass('vl-checkbox--switch');
    }

    async isDisabled() {
        return this._hasClass('vl-checkbox--disabled');
    }
}

module.exports = VlCheckbox;
