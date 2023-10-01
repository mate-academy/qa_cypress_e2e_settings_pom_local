/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.PageObject';

const settingsPage = new settingsPageObject();
const fakeData = settingsPageObject.generateFakeData();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    const newUsername = fakeData.username;
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettingsBtn();
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    const newBio = fakeData.bio;
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    const newEmail = fakeData.email;
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettingsBtn();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    const newPassword = fakeData.password;
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();
  });
});
