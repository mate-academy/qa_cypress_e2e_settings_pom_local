import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

    elements = {
        usernameField: () => cy.getByDataCy('username'),
        bioField: () => cy.getByDataCy('bio'),
        emailField: () => cy.getByDataCy('email'),
        newPasswordField: () => cy.getByDataCy('new-password'),
        updateButton: () => cy.getByDataCy('update'),
        logoutButton: () => cy.getByDataCy('logout'),
        profileBio: () => cy.getByDataCy('profile-bio')
    };

    updateUsername(username) {
        this.elements.usernameField().clear().type(username);
    }

    updateBio(bio) {
        this.elements.bioField().type(bio);
    }

    updateEmail(email) {
        this.elements.emailField().clear().type(email);
    }

    updatePassword(password) {
        this.elements.newPasswordField().type(password);
    }

    clickOnUpdateButton() {
        this.elements.updateButton().click();
    }

    clickOnLogoutButton() {
        this.elements.logoutButton().click();
    }

    pageReload() {
        cy.reload();
    }

    checkUsernameIsUpdated(username) {
        this.elements.usernameField().should('have.value', username);
    }

    checkBioIsUpdated(bio) {
        this.elements.profileBio().should('contain', bio);
    }

    checkEmailIsUpdated(email) {
        this.elements.emailField().should('have.value', email.toLowerCase());
    }
}

export default SettingsPageObject;