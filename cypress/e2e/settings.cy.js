/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';
import faker from 'faker';
const settingsPage = new SettingsPage();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

const testData = {
  email: faker.internet.email(),
  username: faker.name.firstName().toLowerCase(),
  password: faker.random.alphaNumeric(8),
  bio: 'Yelyzaveta Filimonova'
};
describe('Settings page', () => {
  let user;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then(generateUser => {
        user = generateUser;
        cy.login(user.email, user.username, user.password);
      });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsernameField();
    settingsPage.fillUsernameField(testData.username);
    settingsPage.clickOnUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(testData.username);
    cy.url().should('include', 'profile');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillUserBioField(testData.bio);
    settingsPage.clickOnUpdateSettingsBtn();
    cy.wait(2000);
    homePage.assertUpdatedBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmailField();
    settingsPage.fillEmailField(testData.email);
    settingsPage.clickOnUpdateSettingsBtn();
    cy.wait(2000);
    cy.url().should('include', 'profile');
    settingsPage.clickOnSettingsLink();
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillNewPasswordField(testData.password);
    settingsPage.clickOnUpdateSettingsBtn();
    cy.wait(2000);
    homePage.clickOnSettingsLink();
    settingsPage.clickOnLogOutBtn();
    homePage.clickOnSignInLink();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutBtn();
  });
});
