// for local conduit only
/// <reference types="cypress" />

import settingsPageObject from '../support/pages/settings.pageObject';
const settingsPage = new settingsPageObject();
describe('Settings page', () => {
    let user;
    beforeEach(() => {
        cy.task('db:clear');
        cy.task('generateUser').then((generateUser) => {
            user = generateUser;
            cy.login(user.email, user.username, user.password);
        });
    });
    it('should provide an ability to update username', () => {
        settingsPage.visit();
        settingsPage.usernameField.type('new');
        settingsPage.updateBtn.click();

        settingsPage.usernameField.should('have.value', user.username + 'new');
    });

    it('should provide an ability to update bio', () => {
        settingsPage.visit();
        settingsPage.bioField.type('new');
        settingsPage.updateBtn.click();

        cy.reload();
        settingsPage.bioField.should('have.value', 'new');
    });

    // bug
    it.skip('should provide an ability to update an email', () => {
        settingsPage.visit();
        settingsPage.emailField.clear().type('riot1@qa.team');
        settingsPage.updateBtn.click();

        cy.reload();
        settingsPage.emailField.should('have.value', 'riot1@qa.team');
    });

    it('should provide an ability to update password', () => {
        const newPass = '12345Qwerty!';
        settingsPage.visit();
        settingsPage.passwordField.type(newPass);
        settingsPage.updateBtn.click();
        settingsPage.logoutBtn.click();

        cy.reload().clearCookies();
        cy.visit('/user/login');
        cy.getByDataCy('email-sign-in').type(user.email);
        cy.getByDataCy('password-sign-in').type(newPass);
        cy.getByDataCy('sign-in-btn').click();
        cy.getByDataCy('profile-link').should('contain', user.username);
    });

    it('should provide an ability to log out', () => {
        settingsPage.visit();
        settingsPage.logoutBtn.click();
        cy.url().should('not.include', 'settings');
        cy.getByDataCy('sign-in-link').should('exist');
    });
});
