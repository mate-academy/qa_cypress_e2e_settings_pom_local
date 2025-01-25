/// <reference types="cypress" />
/// <reference types="../support" />

const { faker } = require('@faker-js/faker');
import SettingsPageObject from '../support/pages/setting.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const testData = {
  username: faker.internet.userName().toLowerCase(),
  bio: faker.lorem.sentences(2),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 })
};

const homePage = new HomePageObject();
const settingPage = new SettingsPageObject();

describe('Settings page', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((data) => {
      const { email, username, password } = data;

      cy.login(email, username, password);
    });

    settingPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingPage.updateUsername(testData.username);
    settingPage.clickOnUpdateButton();
    settingPage.pageReload();
    settingPage.checkUsernameIsUpdated(testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingPage.updateBio(testData.bio);
    settingPage.clickOnUpdateButton();
    settingPage.checkBioIsUpdated(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingPage.updateEmail(testData.email);
    settingPage.clickOnUpdateButton();
    settingPage.pageReload();
    settingPage.checkEmailIsUpdated(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingPage.updatePassword(testData.password);
    settingPage.clickOnUpdateButton();
  });

  it('should provide an ability to log out', () => {
    settingPage.clickOnLogoutButton();
    homePage.checkHomePageTitle();
  });
});