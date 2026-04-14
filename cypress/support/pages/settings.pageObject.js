import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/settings';
  }


  get usernameField() { return cy.getByDataCy('username-settings'); }
  get bioField()      { return cy.getByDataCy('bio-settings'); }
  get emailField()    { return cy.getByDataCy('email-settings'); }
  get passwordField() { return cy.getByDataCy('password-settings'); }
  get updateButton()  { return cy.get('button[type="submit"]'); }

  visit() {
    cy.visit(this.url);
    cy.url().should('include', '/settings');
  }
}

export const settingsPage = new SettingsPageObject();