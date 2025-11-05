import PageObject from '../PageObject';

class SettingInPageObject extends PageObject {
      url = '/settings';


      // getters for buttons

        get settingsBtn() {
    return cy.get('[href="/settings"]');
  }

  get submitBtn() {
    return cy.get('[type="submit"]');
  }

  get logoutBtn() {
    return cy.contains('.btn-outline-danger', 'Or click here to logout.');
  }

  // getters for values

  get bioInProfile() {
    return cy.get('.col-xs-12 > p');
  }

        get emailByPlaceholder() {
    return cy.inputByPlaceholder('Email');
  }

  get passwordByPlaceholder() {
return cy.inputByPlaceholder('Password');
  }

  get bioByPlaceholder() {
return cy.inputByPlaceholder('Short bio about you');
  }

  get userNameByPlaceholder() {
    return cy.inputByPlaceholder('Username');
  }

  //methods for buttons

    clickSettingsBtn() {
    this.settingsBtn.click();
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  //methods for updating values

  typeNewUserName(updatedUserName) {
    this.userNameByPlaceholder.clear().type(updatedUserName);
  }

  typeNewEmail(updatedEmail) {
    this.emailByPlaceholder.clear().type(updatedEmail);
  }

  typeNewBio(updatedBio) {
    this.bioByPlaceholder.clear().type(updatedBio);
  }

  typeNewPassword(updatedPassword) {
    this.passwordByPlaceholder.clear().type(updatedPassword);
  }

  // methods for checking values

  checkUpdatedBio(updatedBio) {
    this.bioInProfile
    .should('contain.text', updatedBio);
  }

  checkUpdatedEmail(updatedEmail) {
    this.emailByPlaceholder
    .should('have.value', updatedEmail);
  }
}

export default SettingInPageObject;