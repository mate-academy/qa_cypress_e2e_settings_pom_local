import PageObject from '../PageObject';

class  SettingsPageObject extends PageObject {
  url = '/settings';
    
  get newPictureField() {
        return cy.selectByPlaceholder('URL of profile picture');
    }

  get newUsernameField() {
        return cy.selectByPlaceholder('Username');
    }

  get newBioField() {
        return cy.selectByPlaceholder('Short bio about you');
    }
  
  get newEmailField() {
      return cy.selectByPlaceholder('Email');
    }

  get newPasswordField() {
        return cy.selectByPlaceholder('New Password');
    }

  get updateBtn() {
        return cy.get('.btn').contains('Update Settings');
    }
  
  get deleteBtn() {
    return cy.get('.btn').contains('Or click here to logout.');
  }

  typePicture(picture) {
    this.newPictureField.type(picture);
  }

  typeUsername(username) {
    this.newUsernameField.clear();
    this.newUsernameField.type(username);
  }

  typeBio(bio) {
    this.newBioField.clear();
    this.newBioField.type(bio);
  }

  typeEmail(email) {
    this.newEmailField.clear();
    this.newEmailField.type(email);
  }

  typePassword(password) {
    this.newPasswordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }
}

export default SettingsPageObject;