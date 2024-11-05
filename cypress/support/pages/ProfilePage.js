import PageObject from '../PageObject';

class ProfilePage extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('update-username');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  assertProfilePage() {
    return cy.url().should('contain', '/settings');
  }

  get submitBtn() {
    return cy.getByDataCy('submit-btn');
  }

  submitForm() {
    this.submitBtn.click();
  }

  get bioField() {
    return cy.getByDataCy('update-bio');
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  get emailField() {
    return cy.getByDataCy('update-email');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.getByDataCy('update-password');
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default ProfilePage;
