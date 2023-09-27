/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

let element;
let user;
let update;

describe('Settings page', () => {
  
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      update = generateUser;
    });
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearData(element.field.username),
    settingsPage.fillFieldWithData(element.field.username, update.username);
    settingsPage.clickOnButton(element.button.updateButton);
    
    homePage.assertHeaderContainUsername(update.username.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearData(element.field.bio),
    settingsPage.fillFieldWithData(element.field.bio, update.bio);
    settingsPage.clickOnButton(element.button.updateButton);
    settingsPage.visit();
    settingsPage.assertData(element.field.bio, update.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearData(element.field.email),
    settingsPage.fillFieldWithData(element.field.email, update.email);
    settingsPage.clickOnButton(element.button.updateButton);
    settingsPage.visit();
    settingsPage.clickOnButton(element.button.logoutButton);
    
    signInPage.visit();
    signInPage.typeEmail(update.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    
    homePage.assertHeaderContainUsername(user.username.toLowerCase());
  });

  it('should provide an ability to update password', () => {
    settingsPage.clearData(element.field.password),
    settingsPage.fillFieldWithData(element.field.password, update.password);
    settingsPage.clickOnButton(element.button.updateButton);
    settingsPage.visit();
    settingsPage.clickOnButton(element.button.logoutButton);
    
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(update.password);
    signInPage.clickSignInBtn();
    
    homePage.assertHeaderContainUsername(user.username.toLowerCase());
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnButton(element.button.logoutButton);
    homePage.visit();
    homePage.assertUserLogout(user.username.toLowerCase());
  });
});



