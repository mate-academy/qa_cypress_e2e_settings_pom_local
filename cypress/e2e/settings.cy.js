/// <reference types="cypress" />
/// <reference types="../support" />

const { faker } = require('@faker-js/faker');
import ProfilePage from '../support/pages/ProfilePage';

describe('Settings page', () => {
  let profilePage;
  let user;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.login(user.email, user.username, user.password);
    profilePage = new ProfilePage();
    profilePage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    profilePage.typeUsername(newUsername);
    profilePage.submitForm();
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    profilePage.typeBio(newBio);
    profilePage.submitForm();
    profilePage.assertProfilePage();
    // Add assertions to verify the update
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    profilePage.typeEmail(newEmail);
    profilePage.submitForm();
    profilePage.assertProfilePage();
    // Add assertions to verify the update
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    profilePage.typePassword(newPassword);
    profilePage.submitForm();
    profilePage.assertProfilePage();
    // Add assertions to verify the update
  });

  it('should logout successfully', () => {
    profilePage.logout();
    cy.url().should('include', '/');
  });
});

/*it('should provide an ability to log out', () => {
    profilePage.logout();
  });*/
