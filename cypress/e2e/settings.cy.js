/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
 import UserProfilePageObject from '../support/pages/userProfile.pageObject';
 import HomePageObject from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settingsPage.page.Object';

describe('Settings page', () => {
  let user;
  let updateData;

  const signInPage = new SignInPageObject();
   const userProfilePage = new UserProfilePageObject();
   const homePage = new HomePageObject();
   const settingsPage = new SettingsPage();

  before(() => {
    cy.task('generateUser')
      .then((generatedUser) => {
        user = generatedUser;
        return cy.task('generateUpdateData');
      })
      .then((generatedUpdateData) => {
        updateData = generatedUpdateData;
      });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
     settingsPage.fillUsernameField(updateData.username);
    settingsPage.clickUpdateButton();
    homePage.assertHeaderContainUsername(updateData.username);
   });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(updateData.bio);
    settingsPage.clickUpdateButton();
    userProfilePage.assertUpdatedBio(updateData.bio);
    
  });

  it('should provide an ability to update email', () => {
    settingsPage.fillEmailField(updateData.email);
    settingsPage.clickUpdateButton();
    settingsPage.visit();
    settingsPage.clickLogoutButton();
    cy.newLogin(updateData.email, user.password);
    homePage.assertHeaderContainUsername(user.username);

  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(updateData.password);
    settingsPage.clickUpdateButton();
    settingsPage.visit();
    settingsPage.clickLogoutButton();
    cy.newLogin(user.email, updateData.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutButton();
    homePage.usernameLink.should('not.exist');
  });
 });
