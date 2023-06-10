/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingPageObject from '../support/pages/setting.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject(); 
const settingPage = new SettingPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateNewUser').then(generateNewUser => {
        newUser = generateNewUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingPage.visit();
    
    settingPage.FillUsernameField(newUser.username);

    settingPage.clickOnUpdate();
    
    homePage.usernameLink
      .should('contain', newUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.FillBioField(newUser.bio);

    settingPage.clickOnUpdate();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.FillEmailField(newUser.email);

    settingPage.clickOnUpdate();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);

    settingPage.visit();
    settingPage.FillPasswordField(newUser.password);

    settingPage.clickOnUpdate();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);

    settingPage.visit();

    settingPage.clickOnLogOut();
  });
});
