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
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
  name: faker.name.firstName().toLowerCase(),
  bio: faker.random.words(2).toLowerCase(),

};

describe('Settings page', () => {
  let user;

  
    beforeEach(() => {
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
        cy.login(user.email, user.username, user.password);
        settingsPage.visit();
      });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(testData.name);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(testData.name);
 
    
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(testData.bio);
    settingsPage.clickUpdateBtn();
    cy.clearAllCookies();
    settingsPage.assertBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(testData.email);
    settingsPage.clickUpdateBtn();
    signInPage.visit();
    signInPage.typeEmail(testData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(testData.password);
    settingsPage.clickUpdateBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
   
    homePage.assertHeaderContainUsername(user.username);
  

  });

});
