/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';
import ProfilePage from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { base } from '@faker-js/faker';

const homePage = new HomePageObject();
const settingsPage = new SettingsPage();
const profilePage = new ProfilePage();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const baseData = {
    username: 'riot',
    email: 'riot@qa.team'
  };
  let updatedUser = {
    password: 'Dominik!234',
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });   
  });



  it('should provide an ability to update username', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.typeUserName(user.username);
    settingsPage.clickSubmitBtn();
    profilePage.checkUserName(user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickSubmitBtn();
    profilePage.checkBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.typeEmail(user.email);
    settingsPage.clickSubmitBtn();
    settingsPage.visit();
    settingsPage.emailSetts.should('have.value', user.email);
  });

  it('should provide an ability to update password', () => {
    cy.login();
    settingsPage.visit();
    settingsPage.typePassword(updatedUser.password);
    settingsPage.clickSubmitBtn();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(baseData.email);
    signInPage.typePassword(updatedUser.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(baseData.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
