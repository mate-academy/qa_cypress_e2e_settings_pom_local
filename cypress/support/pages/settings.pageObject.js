import PageObject from '../PageObject';

class SettingsPageObject extends PageObject{
    url = '/settings';

    get settingsTitle() {
        return cy.getByDataCy('settings-title');
    };

    get usernameField() {
        return cy.getByDataCy('username');
    };

    get updateButton() {
        return cy.getByDataCy('update-button');
    };

    get profileLink() {
        return cy.getByDataCy('profile-link');
    };

    get usernameTitle() {
        return cy.getByDataCy('title-username');
    };

    get bioField() {
        return cy.getByDataCy('bio');
    };

    get profileBio() {
        return cy.getByDataCy('users-bio');
    };

    get emailField() {
        return cy.getByDataCy('email');
    };

    get settingsPageLink() {
        return cy.getByDataCy('settings-page');
    };

    get passwordField() {
        return cy.getByDataCy('password');
    };

    get logoutButton() {
        return cy.getByDataCy('logout-button');
    };

    assertSettingsTitle() {
        this.settingsTitle.should('contain.text', 'Your Settings');
    };

    clearAndTypeUsername(username) {
        this.usernameField.clear().type(username);
    };

    clickUpdateButton() {
        this.updateButton.click();
    };

    assertUrl(url) {
        cy.url().should('include', `/profile/${url}`);
    };

    assertProfileLink(username) {
        this.profileLink.should('contain.text', username);
    };

    assertUsernameTitle(username) {
        this.usernameTitle.should('contain.text', username);
    };

    clearAndTypeBio(bio) {
        this.bioField.clear().type(bio);
    };

    assertUpdatedBio(bio) {
        this.profileBio.should('contain.text', bio);
    };

    clearAndTypeEmail(email) {
        this.emailField.clear().type(email);
    };

    clickSettingsLink() {
        this.settingsPageLink.click();
    };

    assertUpdatedEmail(email) {
        this.emailField.should('have.value', email);
    };

    clearAndTypePassword(password) {
        this.passwordField.clear().type(password);
    };

    clickLogoutButton() {
        this.logoutButton.click();
    };

    assertStartUrl() {
        cy.url().should('eq', 'http://localhost:3000/');
    };

    assertTokenIsRemoved() {
        cy.getCookie('auth').should('be.null');
    }
};

export default SettingsPageObject;
