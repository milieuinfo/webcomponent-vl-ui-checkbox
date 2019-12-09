
const { assert, driver } = require('vl-ui-core').Test;
const VlCheckboxPage = require('./pages/vl-checkbox.page');

describe('vl-checkbox', async () => {
    const vlCheckboxPage = new VlCheckboxPage(driver);

    before(() => {
        return vlCheckboxPage.load();
    });

    it('ik kan een standaard checkbox aan- en uitvinken', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckbox1();
        const checkbox2 = await vlCheckboxPage.getCheckbox2();

        await assert.eventually.isFalse(checkbox1.isChecked());
        await assert.eventually.isTrue(checkbox2.isChecked());     
        await checkbox1.click();
        await checkbox2.click();
        await assert.eventually.isTrue(checkbox1.isChecked());
        await assert.eventually.isFalse(checkbox2.isChecked());
    });

    it('ik kan een checkbox in block aan- en uitvinken', async () => {
        const checkbox = await vlCheckboxPage.getCheckboxBlock();

        await assert.eventually.isFalse(checkbox.isChecked());
        await checkbox.click(checkbox);
        await assert.eventually.isTrue(checkbox.isChecked());
    });

    it('ik kan een error checkbox aan- en uitvinken', async () => {
        const checkbox = await vlCheckboxPage.getCheckboxError();

        await assert.eventually.isTrue(checkbox.isError());
        await assert.eventually.isFalse(checkbox.isChecked());
        await checkbox.click(checkbox);
        await assert.eventually.isTrue(checkbox.isChecked());
    });

    it('ik kan een disabled checkbox niet aanvinken', async() => {
        const checkbox = await vlCheckboxPage.getCheckboxDisabled();

        await assert.eventually.isTrue(checkbox.isDisabled());
        await assert.eventually.isFalse(checkbox.isChecked());
        await checkbox.click(checkbox);
        await assert.eventually.isFalse(checkbox.isChecked());
    });

    it('ik kan een single checkbox aan- en uitvinken', async () => {
        const checkbox = await vlCheckboxPage.getCheckboxSingle();

        await assert.eventually.isFalse(checkbox.isChecked());
        await checkbox.click(checkbox);
        await assert.eventually.isTrue(checkbox.isChecked());
    });

    it('ik kan een switch checkbox aan- en uitvinken', async () => {
        const checkbox = await vlCheckboxPage.getCheckboxSwitch();

        await assert.eventually.isTrue(checkbox.isSwitch());
        await assert.eventually.isFalse(checkbox.isChecked());
        await checkbox.click(checkbox);
        await assert.eventually.isTrue(checkbox.isChecked());
    });

    it('ik kan multi checkboxes aan- en uitvinken', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckboxMulti1();
        const checkbox2 = await vlCheckboxPage.getCheckboxMulti2();
        const checkbox3 = await vlCheckboxPage.getCheckboxMulti3();

        await assert.eventually.isFalse(checkbox1.isChecked());
        await assert.eventually.isFalse(checkbox2.isChecked());
        await assert.eventually.isFalse(checkbox3.isChecked());
        
        await checkbox1.click();
        await checkbox2.click();
        await checkbox3.click();
        
        await assert.eventually.isTrue(checkbox1.isChecked());
        await assert.eventually.isTrue(checkbox2.isChecked());
        await assert.eventually.isTrue(checkbox3.isChecked());
    });

    it('ik kan multi standaard checkboxes aan- en uitvinken', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckboxMultiStandard1();
        const checkbox2 = await vlCheckboxPage.getCheckboxMultiStandard2();
        const checkbox3 = await vlCheckboxPage.getCheckboxMultiStandard3();

        await assert.eventually.isFalse(checkbox1.isChecked());
        await assert.eventually.isTrue(checkbox2.isChecked());
        await assert.eventually.isTrue(checkbox3.isChecked());
        
        await checkbox1.click();
        await checkbox2.click();
        await checkbox3.click();
        
        await assert.eventually.isTrue(checkbox1.isChecked());
        await assert.eventually.isFalse(checkbox2.isChecked());
        await assert.eventually.isFalse(checkbox3.isChecked());
    });

    after(() => driver && driver.quit());
});
