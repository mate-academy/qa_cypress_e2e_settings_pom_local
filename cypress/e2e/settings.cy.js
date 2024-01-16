/// <reference types="cypress" />
/// <reference types="../support" />

import { beforeEach } from "mocha";
import PageObject from "../support/PageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const homePage = new HomePageObject;
const settingsPage = new SettingsPageObject;
const signInPage = new SignInPageObject;


describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  })

  it('should provide an ability to update username', () => {
   
    settingsPage.fillUsernameField(user.updateUsername);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.updateUsername);

  });

  it('should provide an ability to update bio', () => {


  
    settingsPage.typeInBioField(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.userBioTextExist(user.bio);
  
  });

  it('should provide an ability to update an email', () => {

    settingsPage.typeInEmailField(user.updateEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOnEditBtn();
    settingsPage.emailFieldIsUpdated(user.updateEmail);

    cy.clearAllCookies().reload();
    signInPage.visit();

    signInPage.typeEmail(user.updateEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);   

  });

  it('should provide an ability to update password', () => {

    settingsPage.typeInPasswordField(user.updatePassword);
    settingsPage.clickUpdateBtn();

    cy.clearAllCookies().reload();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.updatePassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);   
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickOnLogOutBtn();
    settingsPage.navbarShouldNotContain(user.username);
   
  });
});
