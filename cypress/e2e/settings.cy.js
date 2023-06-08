/// <reference types="cypress" />
/// <reference types="../support" />

import settingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new settingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  const newData = {
    username: faker.lorem.word(),
    bio: faker.lorem.words(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.type(`{selectAll}${newData.username}`);
    settingsPage.updateBtn.click();
    cy.getByDataCy('username-profile').contains(newData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.type(`{selectAll}${newData.bio}`);
    settingsPage.updateBtn.click();
    cy.getByDataCy('bio-profile').contains(newData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.type(`{selectAll}${newData.email}`);
    settingsPage.updateBtn.click();
    cy.getByDataCy('/settings').click();
    settingsPage.emailField.should('have.value', newData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.type(`{selectAll}${newData.password}`);
    settingsPage.updateBtn.click();
    cy.getByDataCy('/settings').click();
    settingsPage.logoutBtn.click();
    cy.login(user.email, user.username, newData.password);
    settingsPage.visit();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    cy.getByDataCy('/user/login').should('be.visible');
  });
});
