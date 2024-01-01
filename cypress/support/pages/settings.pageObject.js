import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get userName() {
    return cy.getByDataCy('userName');
}
    typeUserName(username) {
    this.userName.type(`{selectAll}{del}${username}`);
  }
  get bio() {
    return cy.getByDataCy('updateBio');
}
  typeBio(bio) {
    this.bio.type(`{selectAll}{del}${bio}`);
  }
  get email() {
    return cy.getByDataCy('email');
  }
  typeEmail(email) {
    this.email.type(`{selectAll}{del}${email}`);
  }

  get password() {
    return cy.getByDataCy('newPassword');
  }
  typePassword (password) {
    this.password.type(`{selectAll}{del}${password}`);
  }
  clickUpdateSettings () {
    cy.getByDataCy('submitButton').click();
  }
};  

export default SettingsPageObject;
