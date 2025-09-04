/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settings = new SettingsPageObject();
const profile  = new ProfilePageObject();
const home     = new HomePageObject();
const signIn   = new SignInPageObject();

const safeUsername = () =>
  faker.string.alpha({ length: 1, casing: 'lower' }) +
  faker.string.alphanumeric({ length: 9, casing: 'lower' }).replace(/[^a-z0-9]/g, '');

describe('Settings page', () => {
  // Wymagane: czyszczenie DB w każdym teście
  beforeEach(() => { cy.task('db:clear'); });

  let user;

  beforeEach(() => {
    return cy
      .task('generateUser')
      .then((u) => {
        user = u;
        return cy
          .registerViaApi(u.email, u.username, u.password)
          .then(() => cy.auth(u.email, u.password));
      })
      .then(() => {
        settings.visit();
      });
  });

  it('should provide an ability to update username', () => {
    const newUsername = safeUsername();

    settings.typeUsername(newUsername);
    settings.submit();

    cy.visit(profile.urlFor(newUsername));
    profile.assertUsernameIs(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence(8);

    settings.typeBio(newBio);
    settings.submit();

    cy.visit(profile.urlFor(user.username));
    profile.assertBioIs(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email(
      { allowSpecialCharacters: false }).toLowerCase();

    settings.typeEmail(newEmail);
    settings.submit();

    settings.logout();
    cy.forceLoginScreen();
    cy.loginUI(newEmail, user.password);

    home.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(
      { length: 12, memorable: false }) + '1!';

    settings.typePassword(newPassword);
    settings.submit();

    settings.logout();
    cy.forceLoginScreen();

    cy.intercept('POST', '**/api/users/login').as('badLogin');

    signIn.visit();
    signIn.typeEmail(user.email);
    signIn.typePassword(user.password);
    signIn.clickSignInBtn();

    cy.wait('@badLogin').its('response.statusCode').should('eq', 422);
    signIn.errorList.should('be.visible');

    cy.loginUI(user.email, newPassword);
    home.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.logout();

    cy.window().then((win) => {
      expect(win.localStorage.getItem('user')).to.be.null;
    });

    cy.getByDataCy('signin-email', { timeout: 10000 }).should('be.visible');

    cy.visit('/settings');
    cy.getByDataCy('signin-email', { timeout: 10000 }).should('be.visible');
    cy.getByDataCy('signin-password', { timeout: 10000 }).should('be.visible');
  });
});
