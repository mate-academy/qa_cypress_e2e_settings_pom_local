/// <reference types="cypress" />
/// <reference types="../support" />

import faker from 'faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject;
const settingsPage = new SettingsPageObject;
const profilePage = new ProfilePageObject;
let user;
const userName = faker.name.firstName().toLowerCase();
const userData = {
  newUserName: userName,
  bio: faker.lorem.words(5).toLowerCase(),
  newEmail: `${userName}@gmail.com`, 
  newPassword: faker.internet.password(),
};

describe('Settings page', () => {
  before(() => {
    
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email,user.username,user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeNewUserName(userData.newUserName);
    settingsPage.clickOnUpdateBtn();
    cy.reload();
    profilePage.assertHeaderIncludNewUsername(userData.newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(userData.bio);
    settingsPage.clickOnUpdateBtn();
    cy.reload();
    settingsPage.assertBioFieldUpdated(userData.bio);

  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(userData.newEmail);
    settingsPage.clickOnUpdateBtn();
    cy.reload();
    settingsPage.assertEmail(userData.newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(userData.newPassword);
    settingsPage.clickOnUpdateBtn();
    cy.clearAllCookies();
    cy.reload();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(userData.newPassword);
    signInPage.clickSignInBtn();

  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogoutBtn();
  });
});
