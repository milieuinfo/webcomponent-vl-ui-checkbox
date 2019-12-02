const VlCheckbox = require('../components/vl-checkbox');
const { Page, Config } = require('vl-ui-core');

class VlCheckboxPage extends Page {
    async _getCheckbox(selector) {
        return new VlCheckbox(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-checkbox.html');
    }
}

module.exports = VlCheckboxPage;
