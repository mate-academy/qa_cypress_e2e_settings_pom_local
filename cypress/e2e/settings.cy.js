/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;
  let userInfo;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUserInfo').then((generateUserInfo) => {
      userInfo = generateUserInfo;
    });
  });

  afterEach(() => {
    settingsPage.visit();
    settingsPage.clickLogOutBtn();
  });

  it('should provide an ability to update username', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.visit();
    cy.get('input[placeholder="Username"]').clear();
    settingsPage.typeUsername(userInfo.username);
    settingsPage.clickUpdateBtn();
    cy.get('h4').should('contain', userInfo.username);
  });

  it('should provide an ability to update bio', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.visit();
    settingsPage.typeBio(userInfo.bio);
    settingsPage.clickUpdateBtn();
    cy.get('.col-xs-12 > p').should('contain', userInfo.bio);
  });

  it('should provide an ability to update an email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.visit();
    cy.get('input[placeholder="Email"]').clear();
    settingsPage.typeEmail(userInfo.email);
    settingsPage.clickUpdateBtn();
    cy.get('.articles-toggle > .nav > :nth-child(1) > .nav-link').should('contain', 'My Posts');
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.visit();
    cy.get('input[placeholder="New Password"]').clear();
    settingsPage.typePassword(userInfo.password);
    settingsPage.clickUpdateBtn();
    cy.get('.articles-toggle > .nav > :nth-child(1) > .nav-link').should('contain', 'My Posts');
    homePage.assertHeaderContainUsername(user.username);
  });

  // it('should provide an ability to log out', () => {
  // });
});
