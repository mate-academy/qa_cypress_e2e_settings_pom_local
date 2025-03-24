/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();


describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUserName = 'NewUsername1345';
    settingsPage.typeName(newUserName);
    settingsPage.saveChanges();

    homePage.assertHeaderContainUsername(newUserName.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'this is a new bio';
    settingsPage.typeBio(newBio);
    settingsPage.saveChanges();

    settingsPage.visit(`/profile/${user.username.toLowerCase()}`);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'updated_email1234@mail.com';
    settingsPage.typeEmail(newEmail);
    settingsPage.saveChanges();

    settingsPage.visit();
    settingsPage.checkEmailText(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'newPassword3456!';
    settingsPage.typePassword(newPassword);
    settingsPage.saveChanges();

    settingsPage.visit();
    settingsPage.logout();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(`${newPassword}{enter}`);

    homePage.assertHeaderContainUsername(user.username.toLowerCase());
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();

    cy.get('.nav-link').should('contain.text', 'Sign in');
  });
});
