import PageObject from '../PageObject';

class Settings extends PageObject {
url ='/settings';

get userNameField() {
    return cy.getByDataCy('userNameField');
  }

get bioField() {
    return cy.getByDataCy('bioField');
  } 
  
get emailField() {
    return cy.getByDataCy('emailField');
  }  

get passwordField() {
    return cy.getByDataCy('passwordField');
  }
  
get updateSettingsBtn() {
    return cy.getByDataCy('updateSettingsBtn');
  }  

get logoutBtn () {
  return cy.getByDataCy('logoutBtn');
}  

get settingsLink() {
    return cy.getByDataCy('settingsLink');
  }

get navigationBar() {
  return cy.getByDataCy('navBar');
}  

typeUserName(userName) {
    this.userNameField.clear();
    this.userNameField.type(userName);
  }

typeBio(bio) {
    this.bioField.type(bio);
  }
typeEmail(newEmail) {
    this.emailField.clear();
    this.emailField.type(newEmail);
  }
  
typePassword(password) {
    this.passwordField.type(password);
  }

clickOnUpdateBtn(button) {
    this.updateSettingsBtn.click(button);
  }

assertSettingsLink(userName) {
  this.settingsLink.should('contain.text', userName);
}

clickOnLogoutBtn(button) {
  this.logoutBtn.click(button);
}
assertUserName(userName) {
  cy.get('h4').should('contain', userName);
}

linkHaveUserNAme(userName) {
  cy.url().should('include', userName);
}

assertBio(bio) {
  cy.get(':nth-child(3) > .nav-link').click();
  cy.getByDataCy('bioField').should('contain', bio);
}


assertEmail(email) {
  this.emailField.should('have.value', email);
}

navBar(username) {
  this.navigationBar.should('not.contain', username);
}

}

export default Settings; 
