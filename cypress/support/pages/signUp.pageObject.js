import SignInPageObject from './signIn.pageObject';

class SignUpPageObject extends SignInPageObject {
  url = '/user/register';

  get nameField() {
    return cy.getByDataCy('name-sign-in');
  }

  typeName(name) {
    this.nameField.type(name);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  checkErrorMessages() {
    this.errorMessages.should('be.visible');
  }
}

export default SignUpPageObject;
