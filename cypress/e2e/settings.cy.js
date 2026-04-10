/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import defaultUser from '../fixtures/loginData.json';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    settingsPage.visit();

    cy.login();

    settingsPage.openSettingsPage();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(user.username);
    settingsPage.clickUpdateSettingsBtn();

    profilePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.username + 'lorem');
    settingsPage.clickUpdateSettingsBtn();

    profilePage.assertBioContainCorrectData(user.username + 'lorem');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickUpdateSettingsBtn();

    profilePage.clickProfileEditLink();
    settingsPage.clickLogOutSettingsBtn();

    homePage.clickSignInBtn();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(defaultUser.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();

    profilePage.clickProfileEditLink();
    settingsPage.clickLogOutSettingsBtn();

    homePage.clickSignInBtn();

    signInPage.typeEmail(defaultUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(defaultUser.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutSettingsBtn();

    cy.getByDataCy('home-link').should('exist');
  });
});
