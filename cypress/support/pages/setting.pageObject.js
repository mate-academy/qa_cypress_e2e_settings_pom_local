import PageObject from '../PageObject';

class settingPageObject extends PageObject {
  url = '/settings/';


get useImageField(){
  return cy.get('[data-cy="user-Image-field"]');
}
get usernameField(){
  return cy.get('[data-cy="username-field"]');
}
get emailField(){
  return cy.get('[data-cy="email-field"]');
}
get bioField(){
  return cy.get('[data-cy="bio-field"]');
}
get newPasswordField(){
  return cy.get('[data-cy="new-password-field"]');
}
get updateBtn(){
  return cy.get('[data-cy="updateBtn"]');
}
fillUserImageField(imageUrl){
  this.useImageField.type(imageUrl);
}
fillUsernameField(username){
  this.usernameField.type(username);
}
fillEmailField(email){
  this.emailField.type(email);
}
fillBioField(bio){
  this.bioField.type(bio);
}
fillPasswordField(newPassword){
  this.newPasswordField.type(newPassword);
}
visit(){
cy.visit(this.url);
}
urlSettings(){
  cy.url().should('be', this.url);
}
clickOnUpdateSettings(){
  this.updateBtn.click();
}
clickLogOutBtn(){
  cy.get('.btn-outline-danger').click();
}

clickUpdateBtn(){
  cy.get('[class="btn btn-outline-danger"]').click();
}

clearUsernameField(){
    cy.get('[data-cy="username-field"]').clear();
}

checkBio(bio){
  cy.get('.profile-page .user-info .container').should('contain', bio);
}

checkEmail(){
  cy.url().should('include', 'profile');
}
};
export default settingPageObject;