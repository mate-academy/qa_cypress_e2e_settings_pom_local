/// <reference types='cypress' />
/// <reference types='../support' />
import { SettingsPageObject } from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  let user;
  const settingsPage = new SettingsPageObject();
  
    beforeEach(() => {
      cy.task('db:clear');
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
      });
  });
 
  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(user.newUsername);
    settingsPage.clickOnSubmitButton();
    settingsPage.usernameField.should('have.value', user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickOnSubmitButton();
    settingsPage.bioField.should('have.value', user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(user.newEmail);
    settingsPage.clickOnSubmitButton();
    settingsPage.emailField.should('have.value', user.newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(user.newPassword);
    settingsPage.clickOnSubmitButton();
    settingsPage.passwordField.should('have.value', user.newPassword);
  });
  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogoutButton();
    cy.url().should('not.include', '/settings');
    settingsPage.assertUserLoggedOut();
  });
});