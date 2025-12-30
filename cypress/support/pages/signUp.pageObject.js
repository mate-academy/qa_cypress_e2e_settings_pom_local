import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register';


  get userNameField() {
    return cy.getByDataCy('username-sign');
  }

  get emailField() {
    return cy.getByDataCy('email-sign');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-btn');
  }

  get userProfileLink() {
    return cy.getByDataCy('profile-link');
  }


  fillSignUpForm(user) {
    this.userNameField.type(user.username);
    this.emailField.type(user.email);
    this.passwordField.type(user.password);
    this.signInBtn.click();
  }
}

export default SignUpPageObject;