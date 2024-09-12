import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('/profile/');
  }

  get signInLink() {
    return cy.getByDataCy('/user/login');
  }

  get signUpLink() {
    return cy.getByDataCy('/user/register');
  }
}

export default homePageObject;
