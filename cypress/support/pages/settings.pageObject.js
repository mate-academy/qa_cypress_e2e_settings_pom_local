import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get bioField() {
    return cy.getByDataCy('bio-input');
  }

  clearBio() {
    return cy.get('textarea.form-control-lg').clear();
  }

  typeBio(text) {
    return cy.get('textarea.form-control-lg').type(text);
  }

  assertBio(text) {
    return cy.get('textarea.form-control-lg').should('have.value', text);
  }

  submitSettings() {
    cy.get('button[type="submit"]').click();
  }

  clearUsername() {
    return cy.get('input.form-control-lg').clear();
  }

  typeUsername(username) {
    return cy.get('input[placeholder="Username"]').type(username);
  }

  assertUsername(username) {
    return cy.get('input.form-control-lg').should('have.value', username);
  }

  clearEmail() {
    return cy.get('input[type="email"]').clear();
  }

  typeEmail(email) {
    return cy.get('input[type="email"]').type(email);
  }

  assertEmail(email) {
    cy.get('input[type="email"].form-control-lg')
      .should('have.attr', 'value', email);
  }

  clearPassword() {
    return cy.get('input[type="password"]').clear();
  }

  typePassword(password) {
    return cy.get('input[type="password"]').type(password);
  }

  assertPassword() {
    cy.get('[data-cy="profile-link"]').should('contain', user.username);
  }

  logout() {
    return cy.contains('button', 'Or click here to logout.').click();
  }

}

export default SettingsPageObject;