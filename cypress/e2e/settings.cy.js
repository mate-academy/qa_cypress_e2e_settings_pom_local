/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();



describe('Settings page', () => {
  let user;

  before(() => {

  });
 
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUsername(user.newUserName);
    settingsPage.clickSubmitButton();
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickSubmitButton();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(user.newEmail);
    settingsPage.clickSubmitButton();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(user.newPassword);
    settingsPage.clickSubmitButton();
  
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutButton();
  });
});
