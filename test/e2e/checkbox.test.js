
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlCheckboxPage = require('./pages/vl-checkbox.page');

describe('vl-checkbox', async () => {
    const vlCheckboxPage = new VlCheckboxPage(driver);

    before(() => {
        return vlCheckboxPage.load();
    });

    it('als gebruiker kan ik een standaard checkbox aan- en uitvinken', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckbox1();

        await kanCheckboxAanEnUitvinken(checkbox1);
    });

    it('als gebruiker kan ik het verschil zien tussen een block en een gewone checkbox', async () => {
        const checkbox = await vlCheckboxPage.getCheckbox1();
        const blockCheckbox = await vlCheckboxPage.getCheckboxBlock();

        await assert.eventually.isFalse(checkbox.isBlock());
        await assert.eventually.isTrue(blockCheckbox.isBlock());
    });

    it('als gebruiker kan ik het verschil zien tussen een error en een gewone checkbox', async () => {
        const checkbox = await vlCheckboxPage.getCheckbox1();
        const errorCheckbox = await vlCheckboxPage.getCheckboxError();

        await assert.eventually.isFalse(checkbox.isError());
        await assert.eventually.isTrue(errorCheckbox.isError());
    });

    it('als gebruiker kan ik een disabled checkbox niet aan- of uitvinken', async() => {
        const checkboxUitgevinkt = await vlCheckboxPage.getCheckboxDisabledUitgevinkt();
        const checkboxAangevinkt = await vlCheckboxPage.getCheckboxDisabledAangevinkt();

        await assert.eventually.isTrue(checkboxUitgevinkt.isDisabled());
        await assert.eventually.isTrue(checkboxAangevinkt.isDisabled());
        
        await assert.eventually.isFalse(checkboxUitgevinkt.isChecked());
        await checkboxUitgevinkt.click();
        await assert.eventually.isFalse(checkboxUitgevinkt.isChecked());

        await assert.eventually.isTrue(checkboxAangevinkt.isChecked());
        await checkboxAangevinkt.click();
        await assert.eventually.isTrue(checkboxAangevinkt.isChecked());
    });

    it('als gebruiker kan ik het verschil zien tussen een single en een gewone checkbox', async () => {
        const checkbox = await vlCheckboxPage.getCheckbox1();
        const singleCheckbox = await vlCheckboxPage.getCheckboxSingle();

        await assert.eventually.isFalse(checkbox.isSingle());
        await assert.eventually.isTrue(singleCheckbox.isSingle());
    });

    it('als gebruiker kan ik een switch checkbox aan- en uitvinken', async () => {
        const switchCheckbox = await vlCheckboxPage.getCheckboxSwitch();

        await assert.eventually.isTrue(switchCheckbox.isSwitch());
        await kanCheckboxAanEnUitvinken(switchCheckbox);
    });

    it('als gebruiker kan ik multi checkboxes aan- en uitvinken', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckboxMulti1();
        const checkbox2 = await vlCheckboxPage.getCheckboxMulti2();
        const checkbox3 = await vlCheckboxPage.getCheckboxMulti3();

        await assert.eventually.isFalse(checkbox1.isChecked());
        await assert.eventually.isFalse(checkbox2.isChecked());
        await assert.eventually.isFalse(checkbox3.isChecked());
        
        await kanCheckboxAanEnUitvinken(checkbox1);
        await kanCheckboxAanEnUitvinken(checkbox2);
        await kanCheckboxAanEnUitvinken(checkbox3);
    });

    it('als gebruiker zie ik dat multiple checkboxes correct geïnitialiseerd zijn', async () => {
        const checkbox1 = await vlCheckboxPage.getCheckboxMultiStandard1();
        const checkbox2 = await vlCheckboxPage.getCheckboxMultiStandard2();
        const checkbox3 = await vlCheckboxPage.getCheckboxMultiStandard3();

        await assert.eventually.isFalse(checkbox1.isChecked());
        await assert.eventually.isTrue(checkbox2.isChecked());
        await assert.eventually.isTrue(checkbox3.isChecked());
    });

    async function kanCheckboxAanEnUitvinken(checkbox) {
        const initialState = await checkbox.isChecked();
        await checkbox.click(); 
        await assert.eventually.equal(checkbox.isChecked(), !initialState);   
        await checkbox.click(); 
        await assert.eventually.equal(checkbox.isChecked(), initialState);  
    }

    after(async () => {
        return driver.quit();
    })
});
