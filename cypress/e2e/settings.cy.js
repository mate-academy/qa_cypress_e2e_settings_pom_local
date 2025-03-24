/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
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
    const newUserName = faker.internet.firstName();
    settingsPage.typeName(newUserName);
    settingsPage.saveChanges();

    homePage.assertHeaderContainUsername(newUserName.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.person.fullName();
    settingsPage.typeBio(newBio);
    settingsPage.saveChanges();

    settingsPage.visit(`/profile/${user.username.toLowerCase()}`);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.saveChanges();

    settingsPage.visit();
    settingsPage.checkEmailText(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = `${faker.internet.color()}1234!`;
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
