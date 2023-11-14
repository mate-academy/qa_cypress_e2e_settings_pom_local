/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsObject from '../support/pages/settings.pageObject';
import faker from 'faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const testData = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.firstName(),
  bio: 'update',

};

describe('Settings page', () => {
  let user;

  
    beforeEach(() => {
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
      });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUsername(testData.name);
    settingsPage.clickUpdateBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    
    homePage.assertHeaderContainUsername(testData.name);

  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(testData.bio);
    settingsPage.clickUpdateBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeEmail(testData.email);
    settingsPage.clickUpdateBtn();

    signInPage.visit();
    signInPage.typeEmail(testData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
   
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typePassword(testData.password);
    settingsPage.clickUpdateBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
   
    homePage.assertHeaderContainUsername(user.username);
  

  });

});
