import PageObject from '../PageObject';

 class SettingsPageObject extends PageObject {
  url = '/settings';
  get nameField(){
    return cy.get('[placeholder=Username]');
  }
  get emailField(){
    return cy.get('[data-cy=settingsPage-profile-email]');
  }
  get passwordField(){
    return cy.get('[data-cy=settingsPage-profile-password]');
  }

  get bioField(){
    return cy.get('[placeholder="Short bio about you"]');
  }

  get updateButton(){
    return cy.get('.btn-primary');
  }


  typeUsername (username){
    this.nameField.clear();
    this.nameField.type(username);
  }

  typeEmail (email){
    this.emailField.clear();
    this.emailField.type(email);
  }
  typePassword (pass){
    this.passwordField.type(pass);
  }
  typeBio (bio){
    this.bioField.type(bio);
  }

  clickUpdateButton(){
    this.updateButton.click();
  }
}

export default SettingsPageObject;