/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    settingsPage.visit();
    cy.login(user.email, user.password);
  });

  it('should provide an ability to update username', () => {
    const newUsername = cy.faker.name.firstName();
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUsernameIsUpdated(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = cy.faker.lorem.sentence();
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertBioIsUpdated(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = cy.faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertEmailIsUpdated(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = cy.faker.internet.password();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertPasswordIsUpdated(newPassword);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    settingsPage.assertUserIsLoggedOut();
  });
});
