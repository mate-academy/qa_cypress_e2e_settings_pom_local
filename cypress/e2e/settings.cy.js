/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const home = new HomePageObject();
const signIn = new SignInPageObject();
const settings = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let bio = faker.lorem.sentence();
  let newEmail = faker.internet.email();
  let newPassword = faker.word.noun();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.typeUsername('123');
    settings.clickUpdateBtn();
    cy.get('h4').should('contain', user.username + '123');
    settings.visit();
    settings.usernameField.clear();
    settings.typeUsername(user.username);
    settings.clickUpdateBtn();
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.typeBio(bio);
    settings.clickUpdateBtn();
    cy.get('p').should('contain', bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.emailField.clear();
    settings.typeEmail(newEmail);
    settings.clickUpdateBtn();
    cy.get('h4').should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.typePassword(newPassword);
    settings.clickUpdateBtn();
    cy.get('h4').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.clickLogoutBtn();
    home.signInLink.should('exist');
  });
});
