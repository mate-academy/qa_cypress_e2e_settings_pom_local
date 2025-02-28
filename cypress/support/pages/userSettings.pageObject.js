import PageObject from '../PageObject';

class UserSettings extends PageObject {
   url = '/settings';

   get usernameField() {
    return cy.getByDataCy('updateUsernameInput');
   }
   get bioField() {
    return cy.getByDataCy('updateBio');
   }
   get emailField() {
    return cy.getByDataCy('updateEmailInput');
   }
   get passwordField() {
    return cy.getByDataCy('updatePasswordInput');
   }
   get updateSettingsBtn() {
    return cy.getByDataCy('updateBtn');
   }
   get bioInfoOnUserPage() {
    return cy.getByDataCy('userBioOnPage');
   }
   get logOutBtn() {
    return cy.getByDataCy('logoutBtn');
   }


   typeUsername(username) {
    this.usernameField.clear().type(username);
   }
   typeBio(bio) {
    this.bioField.type(bio);
   }
   typeEmail(email) {
    this.emailField.clear().type(email);
   }
   typePassword(password) {
    this.passwordField.clear().type(password);
   }
   clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
   }
   clickLogoutBtn() {
    this.logOutBtn.click();
   }
   assertBioUpdated(bio) {
    this.bioInfoOnUserPage.should('contain', bio);
   }

}

export default UserSettings;