/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from "../support/pages/settings.pageObject";
import homePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import faker from "faker";

const settingsPage = new SettingsPageObject;
const homePage = new homePageObject;
const signInPage = new SignInPageObject;

describe('Settings page', () => {
  let user;
  const newUser = {
    username: faker.name.firstName().toLowerCase(),
    bio: faker.lorem.words(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {

    settingsPage.updateUsernameField(newUser.username);
    settingsPage.clickOnUpdateBtnSet();

    cy.getByDataCy('username-profile').should('contain' , newUser.username);
  });

  it('should provide an ability to update bio', () => {

    settingsPage.updateBioField(newUser.bio);
    settingsPage.clickOnUpdateBtnSet();

    cy.getByDataCy('bio-profile').should('contain' , newUser.bio);
  });

  it('should provide an ability to update an email', () => {

    settingsPage.updateEmailField(newUser.email);
    settingsPage.clickOnUpdateBtnSet();

    settingsPage.emailField.should('have.value', newUser.email);
  });

  it('should provide an ability to update password', () => {

    settingsPage.updatePasswordField(newUser.password);
    settingsPage.clickOnUpdateBtnSet();

    settingsPage.passwordField.should('have.value', newUser.password);

    cy.clearCookies();
    cy.reload();

    signInPage.visit();
    cy.login(user.email, user.username, newUser.password);

    cy.get('.nav-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickOnLogOutBtnSet();

    cy.get('.navbar-nav')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
