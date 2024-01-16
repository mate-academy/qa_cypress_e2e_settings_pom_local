import PageObject from '../PageObject';

export class SettingsPageObject extends PageObject {
    url = '/settings';

    get submitButton() {
        return cy.getByDataCy('submit-button');
    }

    clickOnSubmitButton() {
        this.submitButton.click();
    }

    get logoutButton() {
        return cy.getByDataCy('logout-button');
    }

    clickOnLogoutButton() {
        this.logoutButton.click();
    }

    get usernameField() {
        return cy.getByDataCy('username-field');
    }

    typeNewUsername(newUsername) {
        this.usernameField.clear().type(newUsername);
    }

    get bioField() {
        return cy.getByDataCy('bio-field');
    }

    typeBio(bio) {
        this.bioField.type(bio);
    }

    get emailField() {
        return cy.getByDataCy('email-field');
    }

    typeNewEmail(email) {
        this.emailField.clear().type(email);
    }

    get passwordField() {
        return cy.getByDataCy('password-field');
    }

    typeNewPassword(password) {
        this.passwordField.type(password);
    }

    assertUserLoggedOut() {
        cy.get('.nav-link').should('contain', 'Sign in');
    }
}