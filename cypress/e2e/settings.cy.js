/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require('faker');


import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();
//const homePage = new HomePageObject();

describe('Settings page', () => {

  let user;

  const newUserName = faker.name.firstName().toLowerCase();
  const newUserBio = faker.random.word().toLowerCase();
  const newUserEmail = `${newUserName}`+'@gmail.com';
  const newUserPassword = 'blablaBLA123!';

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    cy.log('Updating username...');
    settingsPage.fillEmptyUsernameField(newUserName);
    settingsPage.clickOnButton('update-settings-button');
    settingsPage.assertUpdUsername(newUserName);
  });
  

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(newUserBio);
    settingsPage.clickOnButton('update-settings-button');
    profilePage.assertUserInfo(newUserBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmptyEmailField(newUserEmail);
    settingsPage.clickOnButton('update-settings-button');
    settingsPage.assertUpdEmail(newUserEmail);
  });

  it.only('should provide an ability to update password', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.fillPasswordField(newUserPassword);
    settingsPage.clickOnButton('update-settings-button');
    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newUserPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnButton('logout-button');
    settingsPage.checkUrlEndPoint('http://localhost:3000/');
  });
});
