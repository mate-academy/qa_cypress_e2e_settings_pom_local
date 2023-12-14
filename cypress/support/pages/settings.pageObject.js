import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField() {
        return cy.getByDataCy('edit-username').clear();
    }

    get bioField() {
        return cy.getByDataCy('edit-bio');
    }

    get emailField() {
        return cy.getByDataCy('edit-email').clear();
    }

    get passwordField() {
        return cy.getByDataCy('edit-password');
    }

    typeUsername(username) {
        this.usernameField.type(username);
    }

    typeBio(bio) {
        this.bioField.type(bio);
    }

    typeEmail(email) {
        this.emailField.type(email);
    }

    typePassword(password) {
        this.passwordField.type(password);
    }

    clickOnButton(dataText) {
        cy.get(`[data-cy="${dataText}"]`).click();
    }
}

export default SettingsPageObject;
