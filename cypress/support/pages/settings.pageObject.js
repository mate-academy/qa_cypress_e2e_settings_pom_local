import PageObject from '../PageObject';
import HomePageObject from './home.pageObject';
import SignInPageObject from './signIn.pageObject';
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
class SettingsPageObject extends PageObject {
  url = '/settings';

  get emailField() {
    return cy.getByDataCy('email-sign-in')
  }

  typeEmail(email) {
    this.emailField.type(email)
  }

  writeNewUsername(username) {
    return cy.getByDataCy('username').clear().type(username);
  }

  get selactBioField() {
    return cy.getByDataCy('bio')
  }
  
  get selactEmailField() {
    return cy.getByDataCy('email', {timeout: 5000})
  }
  
  writeNewBio(bio) {
    this.selactBioField.clear().type(bio);
  }
  
  writeNewEmail(email) {
    this.selactEmailField.clear().type(email);
  }
  
  get selectPasswordField() {
    return cy.getByDataCy('password');
  }

  writeNewPassword(password) {
    this.selectPasswordField.clear().type(password);
  }

  get clickSubmit() {
    return cy.getByDataCy('SubmitBtn').click();
  }

  get clickLogout() {
    return cy.getByDataCy('logoutBtn').click();
  }

  assertProfileContainNewBio(bio) {
    this.selactBioField
      .should('contain', bio);
  }
  
  assertProfileContainNewEmail(email) {
    this.selactEmailField
      .should('have.value', email);  
  }
}

export default SettingsPageObject;