import PageObject from '../PageObject';

class settingPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.get('[data-cy="username-field"]');
  }

  get bioField() {
    return cy.get('[data-cy="bio-field"]');
  }

  get emailField() {
    return cy.get('[data-cy="email-field"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-field"]');
  }

  get updateButton() {
    return cy.get('[data-cy="update-btn"]');
  }

  get userInfo() {
    return cy.get('.user-info');
  }

  get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  clcikOnUpdateBtn() {
    this.updateButton.click();
  }

  checkUpdateUserInfo(info) {
    this.userInfo.should('contain', info);
  }

  clearBioField() {
    this.bioField.clear();
  }

  fillBioFiled(bio) {
    this.bioField.type(bio);
  }

  clearEmailField() {
    this.emailField.clear();
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  checkUpdateEmail(email) {
    cy.get('.col-md-6').should('contain', email)
    // this.emailField.contains(email)
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default settingPageObject;