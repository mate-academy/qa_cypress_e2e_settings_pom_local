import PageObject from '../PageObject';

class settingPageObject extends PageObject {
  url = '/settings/';


get useImageField(){
  return cy.get('[data-cy="user-Image-field"');
}
get usernameField(){
  return cy.get('[data-cy="username-field"');
}
get emailField(){
  return cy.get('[data-cy="email-field"');
}
get bioField(){
  return cy.get('[data-cy="bio-field"');
}
get newPasswordField(){
  return cy.get('[data-cy="new-password-field"');
}
get updateBtn(){
  return cy.get('[type="submit"]');
}
fillUserImageField(imageUrl){
  this.useImageField.type(imageUrl);
}
fillUsernameField(username){
  this.usernameField.type(username);
}
fillEmailField(email){
  this.emailFieldField.type(email);
}
fillBioField(bio){
  this.bioField.type(bio);
}
fillNewPasswordField(newPassword){
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
clearUsernameField(){
    cy.get('[data-cy="username-field"]').clear();
}
};
export default settingPageObject;