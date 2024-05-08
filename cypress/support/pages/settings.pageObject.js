import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/settings';

  get userNameSetts() {
    return cy.getByDataCy('username-setts');
  }

  get bioSetts() {
    return cy.getByDataCy('bio-setts');
  }

  get emailSetts() {
    return cy.getByDataCy('email-setts');
  }

  get passwordSetts() {
    return cy.getByDataCy('passwd-setts');
  }

  get submitBtn() {
    return cy.getByDataCy('submit-setts');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout');
  }

  typeUserName(username) {
    this.userNameSetts.clear();
    this.userNameSetts.type(username);
  }

  typeBio(bio) {
    this.bioSetts.clear();
    this.bioSetts.type(bio);
  }

  typeEmail(email) {
    this.emailSetts.clear();
    this.emailSetts.type(email);
  }

  typePassword(password) {
    this.passwordSetts.clear();
    this.passwordSetts.type(password);
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPage;