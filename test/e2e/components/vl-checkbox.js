const { VlElement } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlCheckbox extends VlElement {
    async isChecked() {
        const input = await this._getInput();
        return this.driver.executeScript('return arguments[0].checked', input);
    }    

    async _getInput() {
        return this.shadowRoot.findElement(By.css('#checkbox'));
    }
}

module.exports = VlCheckbox;
