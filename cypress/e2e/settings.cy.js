/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPage from '../support/pages/settings.pageObject';
import SignInPage from '../support/pages/signIn.pageObject';
import faker from 'faker';

describe('Settings page', () => {
  const settingsPage = new SettingsPage();
  const signInPage = new SignInPage();
  let user;
  let newPassword;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName().toLowerCase();
    settingsPage.clearUsername();
    settingsPage.typeUsername(newUsername);
    settingsPage.submitSettings();
    cy.visit('/settings');

    settingsPage.assertUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.clearBio();
    settingsPage.typeBio(newBio);
    settingsPage.submitSettings();
    cy.visit('/settings');

    settingsPage.assertBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();
    settingsPage.clearEmail();
    settingsPage.typeEmail(newEmail);
    settingsPage.submitSettings();
    cy.visit('/settings');

    settingsPage.assertEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    newPassword = faker.internet.password();
    settingsPage.clearPassword();
    settingsPage.typePassword(newPassword);
    settingsPage.submitSettings();

     });
});
