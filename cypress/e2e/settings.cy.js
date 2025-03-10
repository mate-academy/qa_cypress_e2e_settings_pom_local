/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {

  let user;

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
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const updateUsername = faker.name.firstName();
    settingsPage.typeNewUserName(updateUsername);
    settingsPage.clickOnUpdateBioSettingsBtn();
    homePage.assertHeaderContainUsername(updateUsername.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    const updateBio = faker.lorem.words();
    settingsPage.typeNewBio(updateBio);
    settingsPage.clickOnUpdateBioSettingsBtn();
    homePage.clickOnUserNameLink();
    settingsPage.assertupdatedBioInfo(updateBio);
  });

  it('should provide an ability to update an email', () => {
    const updateEmail = faker.internet.email();
    settingsPage.typeUpdateEmail(updateEmail.toLowerCase());
    settingsPage.clickOnUpdateBioSettingsBtn();
    
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(updateEmail.toLowerCase());
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username.toLowerCase());
  });

  it('should provide an ability to update password', () => {
    const updatePassword = faker.internet.password();
    settingsPage.typeUpdatePassword(updatePassword);
    settingsPage.clickOnUpdateBioSettingsBtn();

    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updatePassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username.toLowerCase());
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogoutBtn();
    homePage.assertHeaderNotContainUsername();
  });
});
