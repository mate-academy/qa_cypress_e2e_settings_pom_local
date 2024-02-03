/// <reference types="cypress" />
/// <reference types="../support" />
import UserSettingsPage from '../support/pages/UserSettingsPage';
import { generateUserData } from '../support/utils';

describe('User Settings', () => {
  const userSettingsPage = new UserSettingsPage();

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.login(); // Assuming you have a custom command for logging in
    userSettingsPage.visit('/settings');
  });

  it('should allow updating bio', () => {
    const { bio } = generateUserData();
    userSettingsPage.typeBio(bio);
    userSettingsPage.clickUpdate();
    cy.contains('Profile updated successfully');
    userSettingsPage.bioField.should('have.value', bio);
  });

  it('should allow updating username', () => {
    const { username } = generateUserData();
    userSettingsPage.typeUsername(username);
    userSettingsPage.clickUpdate();
    cy.contains('Profile updated successfully');
    userSettingsPage.usernameField.should('have.value', username);
  });

  it('should allow updating email', () => {
    const { email } = generateUserData();
    userSettingsPage.typeEmail(email);
    userSettingsPage.clickUpdate();
    cy.contains('Profile updated successfully');
    userSettingsPage.emailField.should('have.value', email);
  });

  it('should allow updating password', () => {
    const { password } = generateUserData();
    userSettingsPage.typePassword(password);
    userSettingsPage.clickUpdate();
    cy.contains('Profile updated successfully');
    // Assuming the password field gets cleared or there's a confirmation message
  });
});
