
const { assert, driver } = require('vl-ui-core').Test;
const VlCheckboxPage = require('./pages/vl-checkbox.page');
const { By } = require('selenium-webdriver')

describe('vl-checkbox', async () => {
    const vlCheckboxPage = new VlCheckboxPage(driver);

    before(() => {
        return vlCheckboxPage.load();
    });

    after(() => driver && driver.quit());
});
