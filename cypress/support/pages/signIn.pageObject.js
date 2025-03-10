class SettingsPage {
  url ='/settings';

  get userImageField(){
      return cy.get('[data-cy="url-of-profile-picture"]');
  }

  get usernameField(){
      return cy.get('[data-cy="username-field"]');
  }

  get userBioField(){
      return cy.get('[data-cy="user-bio-field"]');
  }

  get emailField(){
      return cy.get('[data-cy="email-field"]');
  }

  get newPasswordField(){
      return cy.get('[data-cy="new-password-field"]');
  }

  get updatesettingsBtn(){
      return cy.get('[type="submit"]'); 
  }

  get logOutBtn(){
      return cy.get('[class="btn btn-outline-danger"]');
  }

  visitPage(){
      cy.visit(this.url);
  }

  urlIsSettings(){
      cy.url().should('be', this.url);
  }

  fillUserImageField(imageUrl){
      this.userImageField.type(imageUrl);
  }

  fillUsernameField(username){
      this.usernameField.type(username);
  }

  clearUsernameField(){
      this.usernameField.clear();
  }

  fillUserBioField(bio){
      this.userBioField.type(bio);
  }

  fillEmailField(email){
      this.emailField.type(email);
  }

  clearEmailField(){
      this.emailField.clear();
  }

  fillNewPasswordField(password){
      this.newPasswordField.type(password);
  }

  clickOnUpdateSettingsBtn(){
      this.updatesettingsBtn.click();
  }

  clickOnLogOutBtn(){
      this.logOutBtn.click();
  }

  assertUpdatedEmail(email){
      this.emailField.should('have.value', email);
  }

}

export default SettingsPage;
