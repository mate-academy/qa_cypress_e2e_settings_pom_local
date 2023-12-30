/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let update;

  beforeEach(() => {
      cy.task('db:clear');
      cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password); 
      cy.task('updateUser').then((updateUser) => {
        update = updateUser;
      });
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
;    });
  });

  it('should provide an ability to update username', () => {
      settingsPage.visit();
      settingsPage.usernameField.clear();
      settingsPage.typeUsername(update.username);
      settingsPage.clickUpdateBtn();
      cy.url().should('contain', `/profile/${update.username}`);
      cy.getByDataCy('profile-link').should('contain', `${update.username}`);
      
  });
  
  it('should provide an ability to update bio', () => {
      settingsPage.visit();
      settingsPage.typeBio(update.bio);
      settingsPage.clickUpdateBtn();
      cy.url().should('contain', `/profile/${user.username}`);
      cy.getByDataCy('bio').should('contain', `${update.bio}`);
  });

  it('should provide an ability to update an email', () => {
      settingsPage.visit();
      settingsPage.emailField.clear();
      settingsPage.typeEmail(update.email);
      settingsPage.clickUpdateBtn();
      cy.url().should('contain', `/profile/${user.username}`);
  });

  it('should provide an ability to update password', () => {
      settingsPage.visit();
      settingsPage.typePassword(update.password);
      settingsPage.clickUpdateBtn();
      cy.url().should('contain', `/profile/${user.username}`);
  });

  it('should provide an ability to log out', () => {
      settingsPage.visit();
      settingsPage.clickLogoutBtn();
      cy.get('.navbar').should('contain', 'Sign in');
  });
});
