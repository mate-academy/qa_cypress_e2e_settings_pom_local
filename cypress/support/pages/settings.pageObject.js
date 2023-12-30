import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

    get bioField() {
        return cy.getByDataCy('bio');
    }

    get usernameField() {
        return cy.getByDataCy('username');
    }

    get emailField() {
        return cy.getByDataCy('email');
    }

    get passwordField() {
        return cy.getByDataCy('password');
    }

    get updateBtn() {
        return cy.getByDataCy('update-settings-btn');
    }

    get logoutBtn() {
        return cy.getByDataCy('logout');
    }

    typeBio(bio) {
        this.bioField.type(bio);
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

    clickUpdateBtn() {
        this.updateBtn.click();
    }

    clickLogoutBtn() {
        this.logoutBtn.click();
    }
}

export default SettingsPageObject;