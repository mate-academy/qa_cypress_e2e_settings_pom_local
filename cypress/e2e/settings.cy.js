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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUserInfo').then((generateUserInfo) => {
      userInfo = generateUserInfo;
    });
  });

  beforeEach(() => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it.only('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(userInfo);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to update bio', () => {

  });

  it('should provide an ability to update an email', () => {

  });

  it('should provide an ability to update password', () => {

  });

  it('should provide an ability to log out', () => {

  });
});
