/// <reference types="cypress" />
/// <reference types="../support" />

import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

import faker from 'faker';

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();
const signInPage = new SignInPageObject();


describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);   
      cy.visit('/settings');    
    });
  });

    const newUser = {
      newUserName: faker.name.firstName().toLowerCase(),
      newBio: faker.lorem.words(),
      newEmail: faker.internet.email().toLowerCase(),
      newPassword: 'Qwert12345!'
    };

    it('should offer ability to update username', () => { 
      settingsPage.typeUsername(newUser.newUserName);
      settingsPage.clickUpdateButton();
      homePage.assertHeaderContainUsername(newUser.newUserName);
    });

    it('should offer ability to update bio', () => {
      settingsPage.typeBio(newUser.newBio);
      settingsPage.clickUpdateButton();
      cy.visit('/settings'); 
      settingsPage.assertBioContainValue(newUser.newBio);
    });

    it('should offer ability to update an email', () => {
      settingsPage.typeEmail(newUser.newEmail);
      settingsPage.clickUpdateButton();
      cy.visit('/settings');
      settingsPage.assertEmailContainValue(newUser.newEmail);
    });

    it('should offer ability to update password', () => {
      settingsPage.typePassword(newUser.newPassword);
      settingsPage.clickUpdateButton();
      cy.visit('/settings');
      cy.getByDataCy('logout-button').click();
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(newUser.newPassword);
      signInPage.clickSignInButton();
      homePage.assertHeaderContainUsername(user.username);
    });

    it('should offer ability to log out', () => {
      cy.getByDataCy('logout-button').click();
      homePage.visit('/');
      cy.getByDataCy('usernameLink').should('not.exist');
    });
  });
