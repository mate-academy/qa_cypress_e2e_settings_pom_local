import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField() {
        return cy.getByDataCy('edit-username');
    }

    get bioField() {
        return cy.getByDataCy('edit-bio');
    }

    get emailField() {
        return cy.getByDataCy('edit-email');
    }

    get passwordField() {
        return cy.getByDataCy('edit-password');
    }

    typeUsername(username) {
        this.usernameField.clear().type(username);
    }

    typeBio(bio) {
        this.bioField.type(bio);
    }

    typeEmail(email) {
        this.emailField.clear().type(email);
    }

    typePassword(password) {
        this.passwordField.clear().type(password);
    }

    clickOnButton(dataText) {
        cy.get(`[data-cy="${dataText}"]`).click();
    }

    assertEmailField(email) {
      this.emailField
        .should('have.value', email);
    }
}

export default SettingsPageObject;