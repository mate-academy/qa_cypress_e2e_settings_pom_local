import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
 url = '/settings';

 editUsername (username) {
  cy.getByDataCy('usernameSettings')
    .type('{selectAll}' + username)
 };

 editBio (bio) {
  cy.getByDataCy('bioSettings')
    .type('{selectAll}' + bio)
 };

 editEmail (email) {
  cy.getByDataCy('emailSettings')
    .type('{selectAll}' + email)
 };

 editPassword (password) {
  cy.getByDataCy('passwordSettings')
    .type('{selectAll}' + password)
 };

 sumbitSettings () {
  cy.getByDataCy('sumbitSettings')
    .click();
 };

 logOut () {
  cy.getByDataCy('/settings')
    .click();
  cy.get('.btn-outline-danger')
    .click();
 };

 assertNewUsername (newUsername) {
  cy.url()
    .should('contain', `/profile/${newUsername}`)
 };

 assertNewBio (newBio) {
  cy.getByDataCy('/settings')
    .click();
  cy.getByDataCy('bioSettings')
    .should('contain', newBio);  
 };

 assertNewEmail (newUsername, email, password) {
  cy.getByDataCy('/user/login')
    .click();
  cy.getByDataCy('email-sign-in')
    .type(email);
  cy.getByDataCy('password-sign-in')
    .type(password);
  cy.url()
    .should('contain', `/profile/${newUsername}`);     
 };

 assertLogOut () {
  cy.getByDataCy('/user/login')
    .should('contain', 'Sign in');
  cy.getByDataCy('/user/login')
    .should('contain', 'Sign up');  
 }; 

 assertNewPassword (newUsername, email, password) {
  cy.getByDataCy('/user/login')
    .click();
  cy.getByDataCy('email-sign-in')
    .type(email);
  cy.getByDataCy('password-sign-in')
    .type(password);
  cy.url()
    .should('contain', `/profile/${newUsername}`);     
 };
}

export default settingsPageObject;