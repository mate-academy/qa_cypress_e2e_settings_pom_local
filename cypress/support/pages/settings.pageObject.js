import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  get bioField() {
    return cy.get(`
      textarea.form-control.form-control-lg[placeholder="Short bio about you"]
    `);
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }
  
  get newPasswordField() {
    return cy.get('input[placeholder="New Password"]');
  }

  get saveBtn() {
    return cy.get('button.btn.btn-lg.btn-primary[type="submit"]')
      .contains('Update Settings');
  }
  
  get loginPasswordField() {
    return cy.get('input[type="password"][placeholder="Password"]');
  }

  assertUsernameContains(expectedUsername) {
    cy.get('h4').contains(expectedUsername).should('be.visible');
  }
  
  assertBioContains(expectedBio) {
    cy.get('p').contains(expectedBio).should('be.visible');
  }

  assertEmailContains(expectedEmail) {
    cy.get('p.email').contains(expectedEmail).should('be.visible');
  }

  updateUsername(newUsername) {
    this.typeUsername(newUsername);
    this.saveBtn.click();
  }

  updateBio(newBio) {
    this.bioField.clear().type(newBio);
    this.saveBtn.click();
  }

  updateBio(newBio) {
    this.typeBio(newBio);
    this.saveBtn.click();
  }
  
  updateEmail(newEmail) {
    this.emailField.clear().type(newEmail);
    this.saveBtn.click();
  }

  updatePassword(newPassword) {
    this.newPasswordField.clear().type(newPassword);
    this.saveBtn.click();
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.loginPasswordField.should('be.visible').clear().type(password);
  }

  
  loginWithNewEmail(newEmail, password) {
    cy.visit('/user/login');
    this.typeEmail(newEmail);
    this.typePassword(password);
    cy.get('button[type="submit"]').contains('Sign in').click();
  }

  loginWithNewPassword(email, newPassword) {
    cy.visit('/user/login');
    cy.url().should('include', '/user/login');
    this.typeEmail(email);
    this.loginPasswordField.should('exist');
    this.typePassword(newPassword);
    cy.get('button[type="submit"]').contains('Sign in').click();
  }
}

export default SettingsPageObject;