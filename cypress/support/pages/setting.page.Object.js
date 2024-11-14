import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
    get userNameField() {
        return cy.getByDataCy('userNameField-settings').clear();
    }

    get emailField() {
        return cy.getByDataCy('emailField-settings').clear();
    }

    get passwordField() {
        return cy.getByDataCy('passwordField-settings').clear();
    }

    get updateButton() {
        return cy.getByDataCy('updateButton-settings');
    }

    get logoutButton() {
        return cy.get('.btn-outline-danger');
    }

    get bioField() {
        return cy.getByDataCy('bioField-settings').clear();
    }


    typeUserName(username) {
        this.userNameField.type(username);
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

    clickUpdateButton() {
        this.updateButton.click();
    }

    clickLogoutButton() {
        this.logoutButton.click();
    }

    reloadPage() {
        return cy.reload();
    }
}

export default SettingPageObject;