/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const home = new HomePageObject();
const settings = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.usernameField.clear();
    settings.usernameField.type(user.updateUsername);
    settings.clickUpdateBtn();
    cy.get('h4').should('contain', user.updateUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.typeBio(user.bio);
    settings.clickUpdateBtn();
    cy.get('p').should('contain', user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.emailField.clear();
    settings.typeEmail(user.updateEmail);
    settings.clickUpdateBtn();
    cy.get('h4').should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.typePassword(user.updatePassword);
    settings.clickUpdateBtn();
    cy.get('h4').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    settings.clickLogoutBtn();
    home.signInLink.should('exist');
    cy.getCookie('drash_sess')
      .should('have.property', 'value', 'null');
  });
});