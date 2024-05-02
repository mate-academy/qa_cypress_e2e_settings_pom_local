import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

    get userNameField() {
        return cy.getByDataCy('username-field');
    }    
    enterNewUserName(username) {
      this.userNameField.clear().type(username);
    }
    get updateBtn() {
      return cy.getByDataCy('update-button');
    }
    
    clickOnTheUpdateBtn() {
      this.updateBtn.click();
    }
    get userBioField() {
      return cy.getByDataCy('bio-field');
    }
    
    enterBio(bio) {
      this.userBioField.type(bio);
    }
    assertBioFieldUpdated(data) {
      this.userBioField.should('have.value', data);
    }
    get userEmailField() {
      return cy.getByDataCy('email-field');
    }
    
    enterNewUserEmail(email) {
      this.userEmailField.clear().type(email);
    }
    
    assertEmailFieldUpdated(email) {
      this.userEmailField.should('have.value', email);
    }
    get userPasswordField() {
      return cy.getByDataCy('newpassword-field');
    }
    
    enterNewPassword(password) {
      this.userPasswordField.type(password);
    }
    get logOutButton() {
      return cy.getByDataCy('logout-button');
    }
    
    clickOnTheLogOutButton() {
      this.logOutButton.click();
    }

}

export default SettingsPageObject;