import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = 'user/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-in');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get errorMessage() {
    return cy.getByDataCy('error-message');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  get successfulSignUp() {
    return cy.getByDataCy('profile-link')
      .should('contain.text');
  }

  checkUsernameErrorMessage() {
    this.errorMessage.should('contain.text', 'Username must' +
    ' start with a letter, have no spaces, and be 3 - 40 characters');
  }

  checkEmailErrorMessage() {
    this.errorMessage.should('contain.text', 'This email does not seem valid');
  }

  checkPasswordErrorMessage() {
    this.errorMessage.should('contain.text', 'can\'t be blank');
  }
}

export default SignUpPageObject;
