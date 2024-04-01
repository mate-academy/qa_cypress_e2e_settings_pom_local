import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get visitMainPage() {
    return cy.visit('http://localhost:3000');
  }
  
  get visitSignInPage() {
    return cy.visit('http://localhost:3000/user/login');
  }

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.usernameLink
      .should('not.exist');
  }

  get clickSettingsLink() {
    return cy.getByDataCy('SettingsNavLink').click();
  }

  get clickSignInLink() {
    return cy.getByDataCy('SignInLink').click();
  }

  loginUser(email, username, password) {
    return cy.login(email, username, password);
  }

  
}

export default HomePageObject;
