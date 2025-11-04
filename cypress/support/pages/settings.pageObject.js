import {
    th
} from '@faker-js/faker';
import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
    url = '/settings';

    get usernameField() {
        return cy.getByDataCy('username-field');
    }

    typeUsername(username) {
        this.usernameField.type(username);
    }

    clearUsername() {
        this.usernameField.clear();
    }

    clickInUpdateSettings() {
        return cy.getByDataCy('update-settings-btn')
            .click();
    }

    get bioField() {
        return cy.getByDataCy('bio-field');
    }

    clearBio() {
        this.bioField.clear();
    }

    typeBio(bio) {
        this.bioField.type(bio);
    }

    assertContainBio(bio) {
        this.bioField.should('have.value', bio);
    }

    get emailField() {
        return cy.getByDataCy('email-field');
    }

    typeEmail(email) {
        this.emailField.type(email);
    }

    clearEmail() {
        this.emailField.clear();
    }

    assertContainEmail(email) {
        this.emailField.should('have.value', email);
    }

    clickInLogout() {
        cy.getByDataCy('log-out-btn')
            .click();
    }

    get passwordField() {
        return cy.getByDataCy('new-password-field');
    }

    typeNewPassword(password) {
        this.passwordField.type(password);
    }

    clearPassword() {
        this.passwordField.clear();
    }

    assertLoggedOutUser() {
        cy.url().should('eq', 'http://localhost:3000/');
    }
}

export default settingsPageObject;