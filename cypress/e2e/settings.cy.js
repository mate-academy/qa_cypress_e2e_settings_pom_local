/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

import faker from 'faker';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  let newUserName = faker.name.firstName().toLowerCase();
  let newUserEmail = faker.internet.email().toLowerCase();
  let newUserBio = faker.random.words();
  let newUserPassword = faker.internet.password();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });    
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillTheUserNameField(newUserName);
    settingsPage.clickUpdateSettingsButton();


    homePage.assertHeaderContainUsername(newUserName);
    profilePage.assertProfileContainUsername(newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillTheBioField(newUserBio);
    settingsPage.clickUpdateSettingsButton();

    settingsPage.visit();

    settingsPage.assertUserBio(newUserBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillTheSettingsEmailField(newUserEmail);

    settingsPage.clickUpdateSettingsButton();

    settingsPage.visit();

    settingsPage.assertUserEmail(newUserEmail);

  });

  it('should provide an ability to update password', () => {
    settingsPage.fillThePasswordlField(newUserPassword);
    settingsPage.clickUpdateSettingsButton();

    cy.clearCookies();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(newUserPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

  });

  it('should provide an ability to log out', () => {
    settingsPage.clicklogOutButton();

    homePage.assertsignInLinkOnTheHome();
  });
});
