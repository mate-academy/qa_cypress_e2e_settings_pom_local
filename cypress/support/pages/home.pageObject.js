import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('/profile/');
  }

  get settingsLink() {
    return cy.getByDataCy('/settings')
      .click();
  }
}

export default homePageObject;
