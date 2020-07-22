
const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlCheckboxPage = require('./pages/vl-checkbox.page');

describe('vl-checkbox', async () => {
  const vlCheckboxPage = new VlCheckboxPage(driver);

  before(async () => {
    return vlCheckboxPage.load();
  });

  it('als gebruiker kan ik een standaard checkbox aan- en uitvinken', async () => {
    const checkbox = await vlCheckboxPage.getDefaultCheckbox(1);
    await kanCheckboxAanEnUitvinken(checkbox);
  });

  it('als gebruiker zie ik een label bij de checkbox', async () => {
    const checkbox = await vlCheckboxPage.getDefaultCheckbox(1);
    await assert.eventually.equal(checkbox.getLabel(), 'Optie 1');
  });

  it('als gebruiker kan ik het verschil zien tussen een block en een gewone checkbox', async () => {
    const checkbox = await vlCheckboxPage.getDefaultCheckbox(1);
    const blockCheckbox = await vlCheckboxPage.getCheckboxBlock();

    await assert.eventually.isFalse(checkbox.isBlock());
    await assert.eventually.isTrue(blockCheckbox.isBlock());
  });

  it('als gebruiker kan ik het verschil zien tussen een error en een gewone checkbox', async () => {
    const checkbox = await vlCheckboxPage.getDefaultCheckbox(1);
    const errorCheckbox = await vlCheckboxPage.getCheckboxError();

    await assert.eventually.isFalse(checkbox.isError());
    await assert.eventually.isTrue(errorCheckbox.isError());
  });

  it('als gebruiker kan ik een disabled checkbox niet aan- of uitvinken', async () => {
    const checkboxUnchecked = await vlCheckboxPage.getCheckboxDisabledUnchecked();
    const checkboxChecked = await vlCheckboxPage.getCheckboxDisabledChecked();

    await assert.eventually.isTrue(checkboxUnchecked.isDisabled());
    await assert.eventually.isTrue(checkboxChecked.isDisabled());

    await assert.eventually.isFalse(checkboxUnchecked.isChecked());
    await checkboxUnchecked.click();
    await assert.eventually.isFalse(checkboxUnchecked.isChecked());

    await assert.eventually.isTrue(checkboxChecked.isChecked());
    await checkboxChecked.click();
    await assert.eventually.isTrue(checkboxChecked.isChecked());
  });

  it('als gebruiker kan ik het verschil zien tussen een single en een gewone checkbox', async () => {
    const checkbox = await vlCheckboxPage.getDefaultCheckbox(1);
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
    const checkbox1 = await vlCheckboxPage.getCheckboxMulti(1);
    const checkbox2 = await vlCheckboxPage.getCheckboxMulti(2);
    const checkbox3 = await vlCheckboxPage.getCheckboxMulti(3);

    await assert.eventually.isFalse(checkbox1.isChecked());
    await assert.eventually.isFalse(checkbox2.isChecked());
    await assert.eventually.isFalse(checkbox3.isChecked());

    await kanCheckboxAanEnUitvinken(checkbox1);
    await kanCheckboxAanEnUitvinken(checkbox2);
    await kanCheckboxAanEnUitvinken(checkbox3);
  });

  it('als gebruiker zie ik dat multiple checkboxes correct geïnitialiseerd zijn', async () => {
    const checkbox1 = await vlCheckboxPage.getCheckboxMultiStandard(1);
    const checkbox2 = await vlCheckboxPage.getCheckboxMultiStandard(2);
    const checkbox3 = await vlCheckboxPage.getCheckboxMultiStandard(3);

    await assert.eventually.isFalse(checkbox1.isChecked());
    await assert.eventually.isTrue(checkbox2.isChecked());
    await assert.eventually.isTrue(checkbox3.isChecked());
  });

  it('als gebruiker zie ik een label bij een checkbox die gebruik maakt van een slot element', async () => {
    const checkbox = await vlCheckboxPage.getCheckboxSlot();
    const labelSlotElements = await checkbox._getLabelSlotElements();
    await assert.eventually.equal(labelSlotElements[0].getText(), 'Optie 1');
  });

  async function kanCheckboxAanEnUitvinken(checkbox) {
    const initialState = await checkbox.isChecked();
    await checkbox.click();
    await assert.eventually.equal(checkbox.isChecked(), !initialState);
    await checkbox.click();
    await assert.eventually.equal(checkbox.isChecked(), initialState);
  }
});
