/// <reference types="cypress" />
/// <reference types="../support" />

import PageObject from '../support/PageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const page = new PageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let updatedUserData;
  let userData;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUserData').then((newUserData) => {
      updatedUserData = newUserData;
    });
  });

  beforeEach(() => {
    cy.task('generateUserData').then((user) => {
      userData = user;

      cy.register(userData);
    });

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const { username } = userData;
    const { username: newUsername } = updatedUserData;

    settingsPage.assertSettingsContainUsername(username);
    settingsPage.typeUsername(newUsername);
    settingsPage.clickOnUpdateBtn();
    page.assertHeaderContainUsername(newUsername);
    profilePage.assertProfileUsernameUpdated(newUsername);
    page.clickOnSettingsLink();
    settingsPage.assertUsernameUpdated(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const { bio: newBio } = updatedUserData;

    settingsPage.assertSettingsBioEmpty();
    settingsPage.typeBio(newBio);
    settingsPage.clickOnUpdateBtn();
    profilePage.assertProfielContainBio(newBio);
    page.clickOnSettingsLink();
    settingsPage.assertBioUpdated(newBio);
  });

  it('should provide an ability to update an email', () => {
    const { email } = userData;
    const { email: newEmail } = updatedUserData;

    settingsPage.assertSettingsContainEmail(email);
    settingsPage.typeEmail(newEmail);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertEmailUpdated(newEmail);

    const creds = {
      email: newEmail,
      password: userData.password
    };

    settingsPage.clickOnLogoutBtn();
    cy.login(creds);
    page.assertHeaderContainUsername(userData.username);
  });

  it('should provide an ability to update password', () => {
    const { password: newPassword } = updatedUserData;

    settingsPage.assertSettingsPasswordEmpty();
    settingsPage.typePassword(newPassword);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertPasswordUpdated(newPassword);

    const creds = {
      email: userData.email,
      password: newPassword
    };

    settingsPage.clickOnLogoutBtn();
    cy.login(creds);
    page.assertHeaderContainUsername(userData.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.assertSettingsContainLogoutBtn();
    settingsPage.clickOnLogoutBtn();
    page.assertPageUrl();
    page.assertHeaderNotContainUsername();
  });
});
