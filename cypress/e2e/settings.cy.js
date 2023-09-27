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

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then(generateUser => {
        user = generateUser;
      });
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
    settingsPage.fillEmailField(user.email);
    settingsPage.clickUpdateBtn();
    settingsPage.checkEmail(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(user.password);
    settingsPage.clickUpdateBtn();
    signInPage.visit();
    signInPage.emailField
      .type('riot@qa.team');
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
    .click();
    homePage.usernameLink
      .should('contain', 'riot');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.checkLogOut();
  });
});
