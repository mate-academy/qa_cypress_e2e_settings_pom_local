class SignInPage {
    get emailField() {
        return cy.getByDataCy('email-sign-in');
      }
    
      get passwordField() {
        return cy.getByDataCy('password-sign-in');
      }
    
      get signInBtn() {
        return cy.getByDataCy('sign-in-btn');
      }
    
      typeEmail(user) {
        this.emailField.type(user.email);
      }
    
      typeModEmail(edit) {
        this.emailField.type(edit.email);
      }
    
      typePassword(user) {
        this.passwordField.type(user.password);
      }
    
      typeModPassword(edit) {
        this.passwordField.type(edit.password);
      }
    
      clickSignInBtn() {
        this.signInBtn.click();
      }
}
  
export const signInPage = new SignInPage();