/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject
  from '../support/pages/settings.pageObject';
import HomePageObject 
  from '../support/pages/home.pageObject';
import SignInPageObject 
  from '../support/pages/signIn.pageObject';

import faker from 'faker';


describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();
  const homePage = new HomePageObject();
  const signInPage = new SignInPageObject();
  let user;
  const bio = faker.lorem.words();
  const newPassword = faker.internet.password();
  const newEmail = faker.internet.email().toLowerCase();
  // before(() => {
  //   cy.task('generateUser')
  //     .then(generateUser => {
  //       user = generateUser;
  //     });
  // })
  
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then(generateUser => {
        user = generateUser;
      });
    cy.register();
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillUsernameField(user.username);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(bio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkBio(bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.checkEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.checkLogOut();
  });
});
