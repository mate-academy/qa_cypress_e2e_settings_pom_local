/// <reference types="cypress" />
/// <reference types="../support" />

import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';
import profilePageObject from '../support/pages/profile.pageObject';

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const profilePage = new profilePageObject();
let user;

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.login();
    settingsPage.visit();
    cy.task('generateUser')
      .then(generateUser => {
        user = generateUser;
      });
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.type(`{selectAll}${user.username}`);
    settingsPage.updateSettingsBtn.click();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.biographyField.type(user.bio);
    settingsPage.updateSettingsBtn.click();
    homePage.usernameLink.click();
    profilePage.assertNewBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.type(`{selectAll}${user.email}`);
    settingsPage.updateSettingsBtn.click();
    settingsPage.logoutBtn.click();
    cy.login(user.email);
    settingsPage.visit();
    settingsPage.emailField.should('have.value', user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.newPasswordField.type(user.newPassword);
    settingsPage.updateSettingsBtn.click();
    settingsPage.logoutBtn.click();
    cy.login('riot@qa.team', 'riot', user.newPassword);
    settingsPage.visit();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    homePage.signInLink.should('contain', 'Sign in');
    homePage.signUpLink.should('contain', 'Sign up');
  });
});
