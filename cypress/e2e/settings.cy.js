/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.pageObject.js';
const settingsPage = new settingsPageObject();

describe('Settings page', () => {
    let user;
    beforeEach(() => {
        cy.task('db:clear');
        cy.task('generateUser').then((generateUser) => {
            user = generateUser;
            cy.login(user.email, user.username, user.password);
        });
        cy.visit(settingsPage.url);
    });


  it('should provide an ability to update username', () => {
    const newUsername = 'AdolfWhiteCat';
    settingsPage.usernameField.clear()
    .type(newUsername);
    settingsPage.updateBtn.click();

    settingsPage.usernameField.should('have.value', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = `My name is Adolf, and I'm a little naughty boy.`;
    settingsPage.bioField.clear()
    .type(newBio);
    settingsPage.updateBtn.click();

    cy.reload();
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'glorytoukraine@gmail.com';
    settingsPage.emailField.clear()
    .type(newEmail);
    settingsPage.updateBtn.click();

    cy.reload();
    settingsPage.emailField.should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPass = 'CatPass2024';
    settingsPage.passwordField.clear()
    .type(newPass);
    settingsPage.updateBtn.click();
    cy.reload().clearCookies();

    cy.visit('user/login');
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(newPass);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.get('.btn-outline-danger').click();

    cy.url().should('not.include', 'settings');
    cy.getByDataCy('profile-link').should('not.exist');
  });
});
