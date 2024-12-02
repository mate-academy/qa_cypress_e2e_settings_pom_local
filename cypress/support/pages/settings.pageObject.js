import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('UserNameTest');
  }

  get bioField() {
    return cy.getByDataCy('BioTest');
  }

  get emailField() {
    return cy.getByDataCy('EmailTest');
  }

  get newPasswordField() {
    return cy.getByDataCy('NewPasswordTest');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('SubmitBtnTest');
  }

  get logoutBtn(){
    return cy.getByDataCy('logoutBtn');
  }

  clearUsername(){
    this.usernameField.clear();
  }

  clearBio(){
    this.bioField.clear();
  }

  clearEmail(){
    this.emailField.clear();
  }

  updateUsername(username){
    this.usernameField.type(username);
  }

  updateBio(bio){
    this.bioField.type(bio);
  }

  updateEmail(email){
    this.emailField.type(email);
  }

  updatePassword(password){
    this.newPasswordField.type(password);
  }

  clickUpdateBtn(){
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn(){
    this.logoutBtn.click();
  }

  assertUsernameUpdate(username){
    this.usernameField.should('have.value', username);
  }

  assertBioUpdate(bio){
    this.bioField.should('have.text', bio);
  }

  assertEmailUpdate(email){
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;