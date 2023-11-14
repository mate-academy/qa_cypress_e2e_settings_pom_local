import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUserAccount(username) {
    cy.getByDataCy('profile-link')
      .should ('contain', username);
  }

  clickOnSignIn() {
    cy.contains('a', 'Sign in').click();
  }

  fillEmailField(email) {
    cy.getByDataCy('email-sign-in').type(email);
  }

  fillPasswordField(password) {
    cy.getByDataCy('password-sign-in').type(password);
  }

}

export default HomePageObject;
