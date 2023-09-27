import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
 url = '/settings';

 editUsername (username) {
  cy.getByDataCy('username-settings')
    .type('{selectAll}' + username)
 };

 editBio (bio) {
  cy.getByDataCy('bio-settings')
    .type('{selectAll}' + bio)
 };

 editEmail (email) {
  cy.getByDataCy('email-ettings')
    .type('{selectAll}' + email)
 };

 editPassword (password) {
  cy.getByDataCy('password-settings')
    .type('{selectAll}' + password)
 };

 sumbitSettings () {
  cy.getByDataCy('sumbit-settings')
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