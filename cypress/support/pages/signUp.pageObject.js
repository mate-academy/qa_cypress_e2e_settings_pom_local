import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register';

  get userNameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-in-up-btn');
  }

  get errorMessage() {
    return cy.getByDataCy('error-message');
  }

  typeUserName(username) {
    this.userNameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  errorEmailIsTaken() {
    this.errorMessage.should('contain', 'This email is taken.');
  }

  errorUserNameIsTaken() {
    this.errorMessage.should('contain', 'This username is taken.');
  }
}

export default SignUpPageObject;