/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const settingsPage = new SettingsPage();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

const testData = {
  username: faker.name.firstName().toLowerCase(),
  userBio: faker.lorem.sentences(1),
  email: faker.internet.email().toLowerCase(),
  newPassword: faker.internet.password()
};

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visitPage();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsernameField();
    settingsPage.fillUsernameField(testData.username);
    settingsPage.clickOnUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillUserBioField(testData.userBio);
    settingsPage.clickOnUpdateSettingsBtn();
    homePage.assertUpdatedBio(testData.userBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmailField();
    settingsPage.fillEmailField(testData.email);
    settingsPage.clickOnUpdateSettingsBtn();
    cy.wait(2000);
    homePage.openSettingsPage();
    settingsPage.assertUpdatedEmail(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillNewPasswordField(testData.newPassword);
    settingsPage.clickOnUpdateSettingsBtn();
    cy.wait(2000);
    homePage.openSettingsPage();
    settingsPage.clickOnLogOutBtn();
    homePage.openSignInPage();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.newPassword);
    signInPage.clickSignInBtn();
    cy.wait(2000);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutBtn();
    homePage.assertHeaderNotContainUsername(user.username);
  });
});
