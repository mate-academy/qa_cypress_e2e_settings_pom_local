/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPage from '../support/pages/SettingsPage';
import faker from 'faker';

describe('Settings page', () => {
  const settingsPage = new SettingsPage();
  const userEmail = Cypress.env('USER_EMAIL');
  const userPassword = Cypress.env('USER_PASSWORD');

  beforeEach(() => {
    // Czyszczenie bazy danych przed każdym testem
    cy.task('db:clear');
    // Logowanie przed każdym testem
    cy.login(userEmail, userPassword);
    // Przejście na stronę ustawień
    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(10);
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();

    // Sprawdzenie, czy użytkownik może zalogować się nowym hasłem
    settingsPage.clickLogoutBtn();
    cy.login(userEmail, newPassword);
    cy.visit('/settings');
    settingsPage.assertLoggedIn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    settingsPage.assertLoggedOut();
  });
});

