/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import profilePageObject from '../support/pages/profile.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new profilePageObject();
describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();

    settingsPage.visit();
    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateBtn();

    homePage.assertHeaderContainUsername(newUsername);

  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();

    settingsPage.visit();
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    profilePage.assertProfileInfo(newBio);

  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.visit();
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateBtn();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertUpdatedEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(8);

    settingsPage.visit();
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

  });

  // it('should provide an ability to log out', () => {

  // });
});
