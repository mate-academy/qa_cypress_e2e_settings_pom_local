/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require("faker");


import HomePageObject from "../support/pages/home.pageObject";
import SettingsUserAccount from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const homePage = new HomePageObject();
const settings = new SettingsUserAccount();
const signInPage = new SignInPageObject();
let user;

const testData = {
  newUsername: faker.name.firstName(),
  newEmail: faker.internet.email(),
  newBio: faker.lorem.paragraph(),
  newPassword: 'goodjob2023!',
};


describe('Settings page', () => {
  // before(() => {})

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
    cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    settings.fillUsernameField(testData.newUsername);
    settings.clickOnUpdateSettingsBtn();
    settings.assertNewUsername(testData.newUsername.toLowerCase());
    
  });

  it('should provide an ability to update bio', () => {
    settings.fillUserBioField(testData.newBio);
    settings.clickOnUpdateSettingsBtn();
    settings.assertNewBio(testData.newBio);
  });

  it('should provide an ability to update an email', () => {
    settings.fillEmailField(user.email);
    settings.clickOnUpdateSettingsBtn();
    cy.visit('/settings');
    // settings.assertNewEmail(user.email);
  });

  it('should provide an ability to update password', () => {
    settings.fillPasswordField(testData.newPassword);
    settings.clickOnUpdateSettingsBtn();

    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.clickOnLogOutBtn();
    settings.assertLogOutUser(user.username);
  });
});
