import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

/// <reference types="cypress" />
/// <reference types="../support" />

const settingsPage = new settingsPageObject();
const homePage = new homePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const testData = {

    username: faker.name.firstName(),
    bio: faker.address.country(),
    password: 'Qw12345678!',
    email: faker.internet.email().toLowerCase()
  };

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser =>{
      user = generateUser;
    })

  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit;
    settingsPage.usernameField
      .clear()
      .type(testData.username);
    settingsPage.updateBtn;
    homePage.usernameLink
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit;
    settingsPage.bioField
      .type(testData.bio);
    settingsPage.updateBtn;
    cy.getByDataCy('user-bio')
      .should('contain', testData.bio);

  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit;
    settingsPage.emailField
      .clear()
      .type(testData.email);
    settingsPage.updateBtn;
    cy.getByDataCy('profile-username')
      .should('be.visible');
    settingsPage.visit;
    settingsPage.emailField
      .should('have.value', testData.email);

  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit;
    settingsPage.newPasswordField
      .type(testData.password);
    settingsPage.updateBtn;
    cy.getByDataCy('profile-username')
      .should('be.visible');

    cy.clearCookies();
    signInPage.visit();
    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(testData.password);
    signInPage.signInBtn
      .click();
    homePage.usernameLink
      .should('contain', user.username);

  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit;
    settingsPage.logOutBtn;
    cy.getByDataCy('header')
      .should('contain', 'Sign up');

  });
});
