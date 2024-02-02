/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/SettingsPageObject';
import { faker } from '@faker-js/faker';

describe('Settings', () => {
  const settingsPage = new SettingsPageObject();

  beforeEach(() => {
    cy.login(); // Припускаємо, що у вас є команда для входу користувача
    cy.visit('/settings'); // Змініть на актуальний URL сторінки налаштувань
  });

  it('should provide the ability to update Username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.typeUsername(newUsername);
    settingsPage.submit();

    cy.get('.success-message').should('contain', 'Your settings have been successfully updated');
    settingsPage.usernameField.should('have.value', newUsername);
  });

  it('should provide the ability to update Email', () => {
    const newEmail = faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.submit();

    cy.get('.success-message').should('contain', 'Your settings have been successfully updated');
    settingsPage.emailField.should('have.value', newEmail);
  });

  // Додайте інші тестові випадки за потреби
});
