/// <reference types="cypress" />

import SettingsPage from '../support/pages/settings.pageObject';
import PageObject from '../support/PageObject';

describe('Settings page', () => {
  const settingsPage = new SettingsPage();
  const app = new PageObject();

  let user;

  beforeEach(() => {
    // ✅ REQUIRED: clear DB before every test
    cy.task('db:clear');

    // ✅ REQUIRED: faker via custom command
    cy.generateUser().then((generatedUser) => {
      user = generatedUser;

      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });

    settingsPage.open();
  });

  it('should provide an ability to update username', () => {
    const newUsername = `${user.username}_updated`;

    settingsPage.updateUsername(newUsername);

    settingsPage.usernameInput.should('have.value', newUsername);
    app.assertLoggedUsername(newUsername);

    user.username = newUsername;
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();

    settingsPage.updateBio(newBio);

    settingsPage.bioTextarea.should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = `updated_${user.email}`;

    settingsPage.updateEmail(newEmail);

    settingsPage.emailInput.should('have.value', newEmail);

    user.email = newEmail;
  });

  it('should provide an ability to update password and log out', () => {
    const newPassword = user.newPassword;

    // backend confirmation
    cy.intercept('PUT', '/api/user').as('updateUser');

    settingsPage.updatePassword(newPassword);

    cy.wait('@updateUser')
      .its('response.statusCode')
      .should('eq', 200);

    // update local state AFTER backend success
    user.password = newPassword;

    // logout
    settingsPage.logout();

    // login with new password
    cy.login(user.email, user.password);
    app.assertLoggedUsername(user.username);

    // final logout check
    settingsPage.logout();
    cy.get('[data-cy="nav-sign-in"]').should('be.visible');
  });
});
