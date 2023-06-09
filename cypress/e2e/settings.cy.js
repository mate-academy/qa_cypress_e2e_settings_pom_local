/// <reference types="cypress" />
/// <reference types="../support" />

import { url } from "inspector";
import homePageObject from "../support/pages/home.pageObject";
import profilePageObject from "../support/pages/profile.pageObject";
import settingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new settingsPageObject();
const profilePage = new profilePageObject();
const signInPage = new SignInPageObject();
const homePage = new homePageObject();
describe('Settings page', () => {
  before(() => {

  });

  let user;
  const newBio = 'New test bio';
  const newPassword = '123qwe123!';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login();

    settingsPage.visit();

    settingsPage.typeUsername(user.username);

    settingsPage.clickOnUpdate();
    profilePage.usernameValue(user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login();

    settingsPage.visit();

    settingsPage.typeBio(newBio);

    settingsPage.clickOnUpdate();

    profilePage.bioValue(newBio);
  });

  it('should provide an ability to update an email', () => {
    cy.login();

    settingsPage.visit();

    settingsPage.typeEmail(user.email);

    settingsPage.clickOnUpdate();

    settingsPage.visit();

    settingsPage.checkEmailValue(user.email);
  });

  it('should provide an ability to update password', () => {
    cy.login();

    settingsPage.visit();

    settingsPage.typePassword(newPassword);

    settingsPage.clickOnUpdate();

    signInPage.visit();

    signInPage.emailField
      .type('riot@qa.team');
    signInPage.passwordField
      .type(newPassword);
    signInPage.signInBtn
      .click();

    homePage.usernameLink
      .should('contain', 'riot');
  });

  it('should provide an ability to log out', () => {
    cy.login();

    settingsPage.visit();

    settingsPage.clickOnlogout();

    homePage.usernameLink
      .should('not.exist');
  });
});
