import PageObject from "../PageObject";

export class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField() {
        return cy.getByDataCy('username-field');
    }

    typeNewUsername(newUsername) {
        this.usernameField.clear().type(newUsername);
    }

    get updateSettingsButton() {
        return cy.getByDataCy('update-settings-button');
    }

    clickOnUpdateSettingsButton() {
        this.updateSettingsButton.click();
    }

    get bioTextarea() {
        return cy.getByDataCy('user-bio');
    }

    typeNewBio(newBio) {
        this.bioTextarea.clear().type(newBio);
    }

    get emailField() {
        return cy.getByDataCy('user-email');
    }

    typeNewEmail(newEmail) {
        this.emailField.clear().type(newEmail);
    }

    get passwordField() {
        return cy.getByDataCy('user-password');
    }

    typeNewPassword(newPassword) {
        this.passwordField.clear().type(newPassword);
    }

    get logoutButton() {
        return cy.getByDataCy('logout-button');
    }

    clickOnLogoutButton() {
        this.logoutButton.click();
    }

    assertUserLogout() {
        return cy.url().should('not.include', this.url);
    }
}