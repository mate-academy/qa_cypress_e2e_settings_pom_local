import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
    url = 'user/register';

    get usernameField() {
        return cy.getByDataCy('username-sign-in');
    }

    typeUsername(username) {
        this.usernameField.type(username);
    }

    get emailField() {
        return cy.getByDataCy('email-sign-in');
    }

    typeEmail(email) {
        this.emailField.type(email);
    }

    get passwordField() {
        return cy.getByDataCy('password-sign-in');
    }

    typePassword(password) {
        this.passwordField.type(password);
    }

    get SignUpButton() {
        return cy.getByDataCy('sign-in-btn');
    }

    clickSignUpButton() {
        this.SignUpButton.click();
    }
}

export default SignUpPageObject;