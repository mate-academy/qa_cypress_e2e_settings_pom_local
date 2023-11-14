/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require("faker");

import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();


describe('Settings page', () => {
  let user;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();

    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();
    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdatedUsername(newUsername);
    homePage.assertHeaderContainUsername(newUsername);
    homePage.clickUsernameLink();
    profilePage.assertUserInfo(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newbio = faker.lorem.words();
    settingsPage.fillBioField(newbio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdatedBio(newbio);
    homePage.clickUsernameLink();
    profilePage.assertUserInfo(newbio);

  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertUpdatedEmail(newEmail);

  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(user.password);
    settingsPage.clickUpdateSettingsBtn();
    
    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

  });
});
