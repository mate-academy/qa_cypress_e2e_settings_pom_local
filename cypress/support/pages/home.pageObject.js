import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.getByDataCy('signin-link');
  }

  get signUpLink() {
    return cy.getByDataCy('signup-link');
  }

  asserSignInLink() {
    this.signInLink.should('exist');
  }

  asserSignUpLink() {
    this.signUpLink.should('exist');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }
}

export default HomePageObject;
