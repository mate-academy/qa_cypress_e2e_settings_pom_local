/// <reference types="cypress" />
/// <reference types="../support" />
const { faker } = require('@faker-js/faker');
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
const homePage = new HomePageObject(); 
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
let user;
describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  })
  
  beforeEach(() => {
    homePage.visitMainPage;
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }); 
    
  })

  it('should provide an ability to update username', () => {
    let username = faker.person.firstName();
    homePage.loginUser(user.email, user.username, user.password);
    homePage.visitMainPage;
    homePage.clickSettingsLink;
    settingsPage.writeNewUsername(username);
    settingsPage.clickSubmit;
    homePage.assertHeaderContainUsername(user.username);
  })

  it('should provide an ability to update bio', () => {
    let bio = faker.lorem.sentence();
    homePage.loginUser(user.email, user.username, user.password);
    homePage.visitMainPage;
    homePage.clickSettingsLink;
    settingsPage.writeNewBio(bio);
    settingsPage.clickSubmit;
    homePage.clickSettingsLink;
    settingsPage.assertProfileContainNewBio(bio);
  })

  it('should provide an ability to update an email', () => {
    let email = faker.internet.email();
    homePage.loginUser(user.email, user.username, user.password);
    homePage.visitMainPage;
    homePage.clickSettingsLink;
    settingsPage.writeNewEmail(email);
    settingsPage.clickSubmit;
    settingsPage.assertProfileContainNewEmail(email);
  })

  it('should provide an ability to update password', () => {
    let password = 'Aa12345!';
    homePage.loginUser(user.email, user.username, user.password);
    homePage.visitMainPage;
    homePage.clickSettingsLink;
    settingsPage.writeNewPassword(password);
    settingsPage.clickSubmit.then((result) => {
      cy.wait(5000);
    }); 
    settingsPage.clickLogout;
    homePage.visitMainPage;
    homePage.clickSignInLink;
    signInPage.typeEmail(user.email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  })

  it('should provide an ability to log out', () => {
    homePage.loginUser(user.email, user.username, user.password);
    homePage.visitMainPage;
    homePage.clickSettingsLink;
    settingsPage.clickLogout;
    homePage.assertHeaderNotContainUsername(user.username);
  })
})
