/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';

const signInPage = new SignInPageObject();
const settingsPage = new settingsPageObject();
const newUsername = 'AdolfWhiteCat';
const newBio = `My name is Adolf, and I'm a little naughty boy.`;
const newEmail = 'glorytoukraine@gmail.com';
const newPass = 'CatPass2024';

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
    settingsPage.usernameField.clear()
    .type(newUsername);
    settingsPage.updateBtn.click();

    settingsPage.assertUsernameField(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.clear()
    .type(newBio);
    settingsPage.updateBtn.click();

    cy.reload();
    settingsPage.assertBioField(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear()
    .type(newEmail);
    settingsPage.updateBtn.click();

    cy.reload();
    settingsPage.assertEmailField(newEmail);

    cy.reload().clearCookies();
    cy.visit('user/login');
    signInPage.emailField.type(newEmail);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.clear()
    .type(newPass);
    settingsPage.updateBtn.click();
    cy.reload().clearCookies();

    cy.visit('user/login');
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(newPass);
    signInPage.signInBtn.click();
    cy.getByDataCy('profile-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.get('.btn-outline-danger').click();

    cy.url().should('not.include', 'settings');
    cy.getByDataCy('profile-link').should('not.exist');
  });
});
