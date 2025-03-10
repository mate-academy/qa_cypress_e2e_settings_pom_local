/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require("faker");

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject.js'
import ProfilePageObject from '../support/pages/profile.pageObject.js'

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
 
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName();
    
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillUsernameField(newUsername.toLowerCase());
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(newUsername.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.random.word();
    
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillEmailField(newEmail.toLowerCase());
    settingsPage.clickUpdateBtn();

    cy.clearCookies();
    
    signInPage.visit();
    signInPage.typeEmail(newEmail.toLowerCase());
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Pas$word1!'

    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    
    cy.clearCookies();
    
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    homePage.assertUserIsNotLoggedIn();
  });
});
