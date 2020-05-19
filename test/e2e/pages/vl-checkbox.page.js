const VlCheckbox = require('../components/vl-checkbox');
const { Page, Config } = require('vl-ui-core').Test;

class VlCheckboxPage extends Page {
    async _getCheckbox(selector) {
        return new VlCheckbox(this.driver, selector);
    }

    async getCheckbox(number) {
        return this._getCheckbox(`#checkbox-${number}`);
    }

    async getCheckboxBlock() {
        return this._getCheckbox('#checkbox-block');
    }

    async getCheckboxError() {
        return this._getCheckbox('#checkbox-error');
    }

    async getCheckboxDisabledUitgevinkt() {
        return this._getCheckbox('#checkbox-disabled-uitgevinkt');
    }

    async getCheckboxDisabledAangevinkt() {
        return this._getCheckbox('#checkbox-disabled-aangevinkt');
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
        await super.load(Config.baseUrl + '/demo/vl-checkbox.html');
    }
}

module.exports = VlCheckboxPage;
