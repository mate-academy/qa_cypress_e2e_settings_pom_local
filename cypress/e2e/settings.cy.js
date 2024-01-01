/// <reference types="cypress" />
/// <reference types="../support" />

import PageObject from '../support/PageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject;
const homePage = new PageObject;

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  let userRegistered;
  let updatedUser;

  beforeEach(() => {
   homePage.visit;
// i create two sets of data. one for registration and one for updating the settings
    cy.task('generateUser').then((newUser) => {
      cy.register(newUser);
      userRegistered = newUser;
      cy.login(userRegistered);
    });
    cy.task('generateUser').then((newUser) => {
      updatedUser = newUser;
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(updatedUser.username);
    settingsPage.clickUpdateSettings();
    cy.getByDataCy('profile-link')
    .should('contain', updatedUser.username );
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(updatedUser.bio);
    settingsPage.clickUpdateSettings();
    settingsPage.visit();
    cy.getByDataCy('updateBio')
    .should('contain', updatedUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(updatedUser.email);
    settingsPage.clickUpdateSettings();
    settingsPage.visit();
    cy.getByDataCy('email')
    .should('have.value', updatedUser.email);
    // check if can login with old email
    cy.request({
      method: 'POST',
      url: '/api/users/login',
      body : {
        email: userRegistered.email,
        password: userRegistered.password
      },
      failOnStatusCode: false
   }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });


  it('should provide an ability to update password', () => {
    settingsPage.typePassword(updatedUser.password);
    settingsPage.clickUpdateSettings();
    // check if can login with old password
    cy.request({
      method: 'POST',
      url: '/api/users/login',
      body : {
        email: userRegistered.email,
        password: userRegistered.password
      },
      failOnStatusCode: false
   }).then((response) => {
      expect(response.status).to.eq(422);
    });

  });
});
