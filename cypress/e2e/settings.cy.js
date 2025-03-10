/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
const faker = require('faker');

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
   let user;

  beforeEach(() => {
   cy.task('db:clear')
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
   const newUsername = faker.name.firstName().toLowerCase();

   settingsPage.fillUsernameField(newUsername);
   settingsPage.clickUpdateBtn();

   homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
   const newBio = faker.lorem.words();

   settingsPage.fillUserBioField(newBio);
   settingsPage.clickUpdateBtn();
   homePage.assertUpdatedBio(newBio);
  });

  it('should provide an ability to update an email', () => {
   const newEmail = faker.internet.email();
   settingsPage.fillEmailField(newEmail);
   settingsPage.clickUpdateBtn();

   homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
   const newPassword = '12345Qwert!'

   settingsPage.fillPasswordField(newPassword);
   settingsPage.clickUpdateBtn();

   cy.clearCookies()

   signInPage.visit();
   signInPage.typeEmail(user.email);
   signInPage.typePassword(newPassword);
   signInPage.clickSignInBtn();

   homePage.assertHeaderContainUsername(user.username);
   });

  it('should provide an ability to log out', () => {
   settingsPage.clickLogOutBtn();
   homePage.assertUserIsNotLogged();
  });
});
