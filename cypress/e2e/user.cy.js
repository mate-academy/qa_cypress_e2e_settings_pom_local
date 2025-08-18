/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import { UserProfilePage } from '../support/pages/UserProfilePage';

describe('User Profile', () => {
  const profilePage = new UserProfilePage();
  let user;

  before(() => {
    cy.task('clearDatabase'); // czyszczenie bazy
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.signup(user.email, user.username, user.password); // zakładamy komendę do signup
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password); // logowanie przed każdym testem
    cy.visit(`/profile/${user.username}`);
  });

  it('should update bio', () => {
    const newBio = faker.lorem.sentence();
    profilePage.updateProfile({ bio: newBio });
    profilePage.save();

    profilePage.successMessage()
      .should('be.visible')
      .and('contain.text', 'Profile updated successfully'); // dopasuj komunikat
  });

  it('should update username', () => {
    const newUsername = faker.internet.userName();
    profilePage.updateProfile({ username: newUsername });
    profilePage.save();

    profilePage.successMessage()
      .should('be.visible')
      .and('contain.text', 'Profile updated successfully');

    cy.url().should('include', `/profile/${newUsername}`); // sprawdzenie URL
  });

  it('should update email', () => {
    const newEmail = faker.internet.email();
    profilePage.updateProfile({ email: newEmail });
    profilePage.save();

    profilePage.successMessage()
      .should('be.visible')
      .and('contain.text', 'Profile updated successfully');
  });

  it('should update password', () => {
    const newPassword = faker.internet.password(12);
    profilePage.updateProfile({ password: newPassword });
    profilePage.save();

    profilePage.successMessage()
      .should('be.visible')
      .and('contain.text', 'Profile updated successfully');

    // Test logowania nowym hasłem
    cy.logout();
    cy.login(user.email, user.username, newPassword);
    cy.url().should('not.include', '/login'); // sprawdzenie, że login się powiódł
  });
});
