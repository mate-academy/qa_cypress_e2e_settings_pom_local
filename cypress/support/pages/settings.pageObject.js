import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get username()  { return cy.getByDataCy('settings-username'); }
  get bio()       { return cy.getByDataCy('settings-bio'); }
  get email()     { return cy.getByDataCy('settings-email'); }
  get password()  { return cy.getByDataCy('settings-password'); }
  get submitBtn() { return cy.getByDataCy('settings-submit'); }
  get logoutBtn() { return cy.getByDataCy('settings-logout'); }

  visit() {
    cy.visit(this.url);
    cy.url().should('include', '/settings');
  }

  typeUsername(v) {
    this.username.clear();
    this.username.type(v);
  }

  typeBio(v) {
    this.bio.clear();
    this.bio.type(v);
  }

  typeEmail(v) {
    this.email.clear();
    this.email.type(v);
  }

  typePassword(v) {
    this.password.clear();
    this.password.type(v, { log:false });
  }

  submit() {
    this.submitBtn.click();
  }

  logout() {
    cy.intercept('GET', '**/api/articles?limit=10&offset=*').as('homeFeed');
    this.logoutBtn.click();
    cy.wait('@homeFeed');
  }
}

export default SettingsPageObject;
