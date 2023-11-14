/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.PageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';


const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject;

describe('Settings page', () => {
  let user;

  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login();
    settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(user.username);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.paragraph();

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtn();

    profilePage.assertBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.visit();
    settingsPage.assertEmailField(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();

    cy.clearCookies();

    signInPage.visit();
    signInPage.emailField.type('riot@qa.team');
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();

    homePage.assertHeaderContainUsername('riot');
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.usernameLink.should('not.exist');
  });
});
