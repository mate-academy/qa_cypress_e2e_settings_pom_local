// for local conduit only
import PageObject from '../PageObject';
class settingsPageObject extends PageObject {
    url = '/settings';
    get usernameField() {
        return cy.getByDataCy('username-input-field');
    }
    get updateBtn() {
        return cy.getByDataCy('update-settings-button');
    }
    get modalText() {
        return cy.get('.swal-title');
    }
    get bioField() {
        return cy.getByDataCy('bio-input-field');
    }
    get emailField() {
        return cy.getByDataCy('email-input-field');
    }
    get passwordField() {
        return cy.getByDataCy('password-input-field');
    }
    get logoutBtn() {
        return cy.getByDataCy('logout-btn');
    }
}
export default settingsPageObject;
