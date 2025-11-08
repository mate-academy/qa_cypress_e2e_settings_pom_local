/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsInPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';
import { sign } from 'crypto';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsInPageObject();
describe('Settings page', () => {
  let user;
  before(() => {
      cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });
  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
        signInPage.visit('/');
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.clickSettingsBtn();
  });

  it('should provide an ability to update username', () => {
        const randomNumber = String(Math.floor(Math.random() * 10000));
    const updatedUserName = faker.person.firstName() + randomNumber;
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    settingsPage.typeNewUserName(updatedUserName);
      settingsPage.clickSubmitBtn();
      homePage.assertHeaderContainUsername(updatedUserName.toLocaleLowerCase());
    
  });

  it('should provide an ability to update bio', () => {
    const updatedBio = faker.word.words(10);
        settingsPage.typeNewBio(updatedBio);
            settingsPage.clickSubmitBtn();
        settingsPage.checkUpdatedBio(updatedBio);
  });

  it('should provide an ability to update an email', () => {
    const updatedEmail = 'test'
     + String(Math.floor(Math.random() * 1000)) + '@mail.com';
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        settingsPage.typeNewEmail(updatedEmail);
            settingsPage.clickSubmitBtn();
        settingsPage.clickSettingsBtn();
         settingsPage.checkUpdatedEmail(updatedEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword('NewPassword!!!');
    settingsPage.clickSubmitBtn();
    homePage.clickSettingsLink();
    settingsPage.clickLogoutBtn();
    homePage.clickSignInNav();
    signInPage.emailField
    .type(user.email);
    signInPage.passwordField
    .type('NewPassword!!!');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
   
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.checkProfileLinkForLogout();
  });
});
