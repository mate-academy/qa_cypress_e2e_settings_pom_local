/// <reference types="cypress" />
/// <reference types="../support" />
import { settings } from 'cluster';
import faker from 'faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { fa } from 'faker/lib/locales';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const testData = {
  email: faker.internet.email().toLowerCase(),
  username: faker.name.firstName().toLowerCase(),
  password: faker.internet.password(),
  bio: faker.lorem.words()
};

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;

 before(() => {
 });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
      });
   });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(testData.username);
    settingsPage.clickUpdateSettings();
    homePage.assertHeaderContainUsername(testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBioField(testData.bio);
    settingsPage.clickUpdateSettings();
    profilePage.assertBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmailField(testData.email);
    settingsPage.clickUpdateSettings();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(testData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePasswordField(testData.password);
    settingsPage.clickUpdateSettings();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.assertHeaderNotContainUsername();
  });
});
