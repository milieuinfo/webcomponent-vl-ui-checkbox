
const { assert, driver } = require('vl-ui-core').Test;
const VlCheckboxPage = require('./pages/vl-checkbox.page');
const { By } = require('selenium-webdriver')

describe('vl-checkbox', async () => {
    const vlCheckboxPage = new VlCheckboxPage(driver);

    before(() => {
        return vlCheckboxPage.load();
    });

    it('ik kan een standaard checkbox aan- en uitvinken', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckbox1();
        const checkbox2 = await vlCheckboxPage.getCheckbox2();

        await assert.eventually.isFalse(vlCheckboxPage.isChecked(checkbox1));
        await assert.eventually.isTrue(vlCheckboxPage.isChecked(checkbox2));
        
        await driver.executeScript('return arguments[0].click();', checkbox1);
        await driver.executeScript('return arguments[0].click();', checkbox2);
        
        await assert.eventually.isTrue(vlCheckboxPage.isChecked(checkbox1));
        await assert.eventually.isFalse(vlCheckboxPage.isChecked(checkbox2));
    })

    after(() => driver && driver.quit());
});
