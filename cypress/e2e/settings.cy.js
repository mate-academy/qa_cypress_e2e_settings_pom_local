/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import UserSettings from '../support/pages/userSettings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const userSettings = new UserSettings();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    userSettings.visit();
  });

  it('should provide an ability to update username', () => {
    userSettings.typeUsername(user.username);
    userSettings.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    userSettings.typeBio(user.bio);
    userSettings.clickUpdateSettingsBtn();
    userSettings.assertBioUpdated(user.bio);
  });

  it('should provide an ability to update an email', () => {
    userSettings.typeEmail(user.email);
    userSettings.clickUpdateSettingsBtn();
    userSettings.visit();
    userSettings.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to update password', () => {
    userSettings.typePassword(user.password);
    userSettings.clickUpdateSettingsBtn();
    userSettings.visit();
    userSettings.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to log out', () => {
    userSettings.clickLogoutBtn();
  });
});
