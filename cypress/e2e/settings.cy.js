/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('generateUser')
      .then((generatedUser1) => {
        newUser = generatedUser1;
      });

    cy.task('generateUser')
      .then((generatedUser2) => {
        user = generatedUser2;
      });
  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.login(
      user.email, 
      user.username, 
      user.password
    );

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage
      .typeUserName(newUser.username);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    homePage
      .assertHeaderContainUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage
      .typeBio(newUser.username);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    homePage.usernameLink
      .click();

    profilePage
      .assertBio(newUser.username);
  });

  it('should provide an ability to update an email', () => {
    settingsPage
      .typeEmail(newUser.email);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    settingsPage
      .clickLogoutBtn();

    cy.login(newUser.email, user.password);

    homePage
      .assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage
      .typeEmail(newUser.password);

    settingsPage
      .clickUpdateBtn();

    settingsPage
      .clickOkBtn();

    settingsPage
      .clickLogoutBtn();
    
    cy.login(user.email, newUser.password);

    homePage
      .assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage
      .clickLogoutBtn();

    homePage
      .checkNotAuthorized();
  });
});
