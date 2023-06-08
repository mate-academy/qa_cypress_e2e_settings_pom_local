import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('/profile/');
  }

  get navbar() {
    return cy.get('.navbar');
  }
}

export default homePageObject;
