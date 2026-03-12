//SettingCy
/// <reference types="cypress" />
/// <reference types="../support" />
import SignUpPageObject from '../support/pages/signUp.pageObject.js';
import HomePageObject from '../support/pages/home.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';
import SettingPageObject from '../support/pages/settings.pageObject.js';
import UserObj from '../support/pages/userObject.js';

describe('Settings page', () => {
  const signUpPage = new SignUpPageObject();
  const homePage = new HomePageObject();
  const signInPage = new SignInPageObject();
  const settingPage = new SettingPageObject();

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    homePage.clearMarks();
    settingPage.clearMarks();
    signUpPage.clearMarks();
    signUpPage.visit();
    signUpPage.createMarks();
  });

  it('should provide an ability to update username', () => {
    const user = new UserObj();
  
    signUpPage.registerViaGUI(user.username, user.email, user.password, false);
    homePage.createMarks(true);
    homePage.clickSettingsLink();
    settingPage.createMarks();
    settingPage.usernameField
      .clear()
      .type(user.newUsername);
    settingPage.clickOnUpdateButton();
    settingPage.usernameField
      .should('have.value', user.newUsername);
    homePage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    const user = new UserObj();
  
    signUpPage.registerViaGUI(user.username, user.email, user.password, false);
    homePage.createMarks(true);
    homePage.clickSettingsLink();
    settingPage.createMarks();
    settingPage.bioTextArea
      .clear()
      .type(user.bio);
    settingPage.clickOnUpdateButton(); //set bio
    homePage.clickSettingsLink();
    settingPage.bioTextArea
      .should('have.value', user.bio); //test bio
    settingPage.bioTextArea
      .clear()
      .type(user.newBio);
    settingPage.clickOnUpdateButton(); //update bio
    homePage.clickSettingsLink();
    settingPage.bioTextArea.
      should('have.value', user.newBio); // test updated bio
  });

  it('should provide an ability to update an email', () => {
    const user = new UserObj();
  
    signUpPage.registerViaGUI(user.username, user.email, user.password, false);
    homePage.createMarks(true);
    homePage.clickSettingsLink();
    settingPage.createMarks();
    settingPage.emailField
      .clear()
      .type(user.newEmail);
    settingPage.clickOnUpdateButton();
    homePage.clickSettingsLink();
    settingPage.emailField
      .should('have.value', user.newEmail);
    settingPage.clickOnLogOutButton();
    homePage.createMarks(false); 
    homePage.clickSignInLink();
    signInPage.logInByGUI(user.newEmail, user.password);
  });

  it('should provide an ability to update password', () => { 
    const user = new UserObj();
  
    signUpPage.registerViaGUI(user.username, user.email, user.password, false);
    homePage.createMarks(true);
    homePage.clickSettingsLink();
    settingPage.createMarks();
    settingPage.passwordField
      .clear()
      .type(user.newPassword);
    settingPage.clickOnUpdateButton();
    homePage.clickSettingsLink();
    settingPage.clickOnLogOutButton();
    homePage.createMarks(false); 
    homePage.clickSignInLink();
    signInPage.logInByGUI(user.email, user.newPassword);
  });

  it('should provide an ability to log out', () => {
    const user = new UserObj();
  
    signUpPage.registerViaGUI(user.username, user.email, user.password, false);
    homePage.createMarks(true);
    homePage.clickSettingsLink();
    settingPage.createMarks();
    settingPage.clickOnLogOutButton();
    cy.location('pathname')
      .should('equal', '/');
  });
});