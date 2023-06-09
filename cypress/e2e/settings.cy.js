/// <reference types="cypress" />
/// <reference types="../support" />
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.PageObject';

const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

  const testData = {
    username: 'edited_name',
    bio: 'edited_bio',
    email: 'edited_email@qa.team',
    password: 'Edited_password123'
  };

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.clear().type(testData.username);
    settingsPage.updateBtn.click();
    profilePage.usernameProfile.should('contain', testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.clear().type(testData.bio);
    settingsPage.updateBtn.click();
    profilePage.bioProfile.should('contain', testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear().type(testData.email);
    settingsPage.updateBtn.click();
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    cy.login(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.clear().type(testData.password);
    settingsPage.updateBtn.click();
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    cy.login(testData.password);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    homePage.navbar.should('contain', 'Sign in');
  });
});
