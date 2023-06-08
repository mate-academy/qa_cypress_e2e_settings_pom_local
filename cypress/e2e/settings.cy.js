/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPage from '../support/pages/settting.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
const faker = require('faker');

const signInPage = new SignInPageObject();
const settingPage = new SettingsPage();

let user;

describe('Settings page', () => {
  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  const testData = {
    bio: faker.lorem.words(),
    userName: faker.name.firstName().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    settingPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingPage.typeUsername(testData.userName);
    settingPage.clickUpdateBtn();
    settingPage.checkUserNameData(testData.userName);
  });

  it('should provide an ability to update bio', () => {
    settingPage.typeBio(testData.bio);
    settingPage.clickUpdateBtn();
    settingPage.checkBioData(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingPage.typeEmail(testData.email);
    settingPage.clickUpdateBtn();
    settingPage.checkEmail(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingPage.typePassword(testData.password);
    settingPage.clickUpdateBtn();
    settingPage.checkPassword(testData.password, user.email, user.username);
  });

  it('should provide an ability to log out', () => {
    settingPage.clickLogoutButton();
  });
});
