const VlCheckbox = require('../components/vl-checkbox');
const { Page, Config } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlCheckboxPage extends Page {
    async _getCheckbox(selector) {
        return new VlCheckbox(this.driver, selector);
    }

    async _getCheckboxInput(selector) {
        const checkbox = await this._getCheckbox(selector);
        return checkbox.shadowRoot.findElement(By.css('#checkbox'));
    }

    async getCheckbox1() {
        return await this._getCheckboxInput('#checkbox-1');
    }

    async getCheckbox2() {
        return await this._getCheckboxInput('#checkbox-2');
    }

    async getCheckboxBlock() {
        return await this._getCheckboxInput('#checkbox-block');
    }

    async getCheckboxError() {
        return await this._getCheckboxInput('#checkbox-error');
    }

    async getCheckboxDisabled() {
        return await this._getCheckboxInput('#checkbox-disabled')
    }

    async getCheckboxSingle() {
        return await this._getCheckboxInput('#checkbox-single');
    }

    async getCheckboxSwitch() {
        return await this._getCheckboxInput('#checkbox-switch');
    }

    async getCheckboxMulti1() {
        return await this._getCheckboxInput('#checkbox-multi-1')
    }

    async getCheckboxMulti2() {
        return await this._getCheckboxInput('#checkbox-multi-2');
    }

    async getCheckboxMulti3() {
        return await this._getCheckboxInput('#checkbox-multi-3');
    }

    async getCheckboxMultiStandard1() {
        return await this._getCheckboxInput('#checkbox-multi-st-1')
    }    
    
    async getCheckboxMultiStandard2() {
        return await this._getCheckboxInput('#checkbox-multi-st-2')
    }    
    
    async getCheckboxMultiStandard3() {
        return await this._getCheckboxInput('#checkbox-multi-st-3')
    }

    async isChecked(element) {
        return this.driver.executeScript('return arguments[0].checked', element);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-checkbox.html');
    }
}

module.exports = VlCheckboxPage;
