import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  clearData(fieldName) {
    cy.getByDataCy(fieldName)
      .clear();
  };

  fillFieldWithData(fieldName, text) {
    cy.getByDataCy(fieldName)
      .type(text);
  };

  assertData(element, data) {
    cy.getByDataCy(element)
      .should('contain', data);
  }

};

export default SettingsPageObject;