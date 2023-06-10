/// <reference types="cypress" />
/// <reference types="../support" />
import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();

const userData = {
  username: 'riot',
  email: 'riot@qa.team',
  password: '12345Qwert!',
}

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    homePage.clearDatabase();
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    settingsPage.loggedUser();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.clickSubmitButton();
    homePage.newUsernameLink(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.clickSubmitButton();
    homePage.clickSettingsLink();
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.clickSubmitButton();
    homePage.clickSettingsLink();
    settingsPage.logOut();
    settingsPage.assertLogOut();
    signInPage.visit();
    signInPage.emailField(user.email);
    signInPage.passwordField(userData.password);
    signInPage.signInBtn();
    homePage.usernameLink(userData.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.clickSubmitButton();
    homePage.clickSettingsLink();
    settingsPage.logOut();
    settingsPage.assertLogOut();
    signInPage.visit();
    signInPage.emailField(userData.email);
    signInPage.passwordField(user.password);
    signInPage.signInBtn();
    homePage.usernameLink(userData.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOut();
    settingsPage.assertLogOut();
  });
});
