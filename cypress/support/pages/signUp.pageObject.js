import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
    url='/user/register';

    get usernameInput() {
        return cy.getByDataCy('username-sign-in');
    }
    get emailInput() {
        return cy.getByDataCy('email-sign-in');
    } 

    get passwordInput() {
        return cy.getByDataCy('password-sign-in');
    }
    get signUpBtn() {
        return cy.getByDataCy('sign-up-btn');
    }

 typeUserName(username) {
    this.usernameInput
    .type(username);
 }   

 typeEmail(email) {
    this.emailInput
    .type(email);
 }

 typePassword(password) {
    this.passwordInput
    .type(password);
 }
 clickSignUpBtn() {
    this.signUpBtn
    .click();
 }
}

export default SignUpPageObject;