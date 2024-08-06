/// <reference types="cypress" />
/// <reference types="../support" />
import UserSettingsPage from '../support/pages/UserSettingsPage';
import { faker } from '@faker-js/faker';

describe('User Settings', () => {
  const userSettingsPage = new UserSettingsPage();

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.login();
    userSettingsPage.visit('/settings');
  });

  it('should allow updating bio', () => {
    const newBio = faker.lorem.sentence();
    userSettingsPage.typeBio(newBio);
    userSettingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
    userSettingsPage.bioField.should('have.value', newBio);
  });

  it('should allow updating username', () => {
    const newUsername = faker.internet.userName();
    userSettingsPage.typeUsername(newUsername);
    userSettingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
    userSettingsPage.usernameField.should('have.value', newUsername);
  });

  it('should allow updating email', () => {
    const newEmail = faker.internet.email();
    userSettingsPage.typeEmail(newEmail);
    userSettingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
    userSettingsPage.emailField.should('have.value', newEmail);
  });

  it('should allow updating password', () => {
    const newPassword = faker.internet.password();
    userSettingsPage.typePassword(newPassword);
    userSettingsPage.clickUpdate();
    cy.contains('Your settings have been updated').should('be.visible');
    userSettingsPage.passwordField.should('not.have.value', newPassword);
  });
});
