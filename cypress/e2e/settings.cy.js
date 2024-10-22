/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsUsername from '../support/pages/settings.username.pageObject';
import SettingsBio from '../support/pages/settings.bio.pageObject';
import SettingsEmail from '../support/pages/settings.email.pageObject';
import SettingsPassword from '../support/pages/settings.password.pageObject';
import faker from 'faker';

describe('Settings page', () => {
  const user = {
    email: 'wombat777@i.ua',
    password: '1234567890'
  };

  beforeEach(() => {
    cy.login(user);
    cy.visit('/settings');
  });

  const newUsername = faker.internet.userName();
  const newBio = 'My new bio';
  const newEmail = faker.internet.email();
  const newPassword = faker.internet.password();

  it('should provide an ability to update username', () => {
    SettingsUsername.updateUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    SettingsBio.updateBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    SettingsEmail.updateEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    SettingsPassword.updatePassword(newPassword);

  });

  it('should provide an ability to log out', () => {
    cy.get('button').contains('Or click here to logout.').click();
    cy.contains('.nav-link', 'Sign in').should('be.visible');
  });
});
