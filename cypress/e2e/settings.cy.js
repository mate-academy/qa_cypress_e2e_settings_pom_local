/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((newUser) => {
      settingsPage.updateUsername(newUser.username);
      settingsPage.clickUpdateSettingsBtn();

      cy.url().should('include', `/profile/${newUser.username}`);
    });
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'QA automation enthusiast';

    settingsPage.updateBio(newBio);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.visit();
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    cy.task('generateUser').then((newUser) => {
      settingsPage.updateEmail(newUser.email);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.visit();
      settingsPage.emailField.should('have.value', newUser.email);
    });
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPassword123';

    settingsPage.updatePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    cy.url().should('not.include', '/user/login');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
});
