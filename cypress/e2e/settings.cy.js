import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

/// <reference types="cypress" />
/// <reference types="../support" />

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  const newSettingsData = {
    username: faker.lorem.word(23),
    bio: faker.lorem.words(10),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeInUsernameField(newSettingsData.username);

    settingsPage.clickOnSubmitButton();

    settingsPage.visit();

    settingsPage.assertNewUsername(newSettingsData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeInBioField(newSettingsData.bio);

    settingsPage.clickOnSubmitButton();

    settingsPage.visit();

    settingsPage.assertNewBio(newSettingsData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeInEmailField(newSettingsData.email);

    settingsPage.clickOnSubmitButton();

    settingsPage.visit();

    settingsPage.assertNewEmail(newSettingsData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeInPasswordField(newSettingsData.password);

    settingsPage.clickOnSubmitButton();

    settingsPage.visit();

    settingsPage.clickOnLogoutButton();

    settingsPage.visit('/user/login');

    signInPage.typeEmail('riot@qa.team');

    signInPage.typePassword(newSettingsData.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogoutButton();

    homePage.assertUserLogout();
  });
});
