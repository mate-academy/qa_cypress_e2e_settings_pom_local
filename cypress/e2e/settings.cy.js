/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject'
import homePageObject from '../support/pages/home.pageObject'
import { faker } from '@faker-js/faker'

const signInPage = new SignInPageObject()
const homePage = new homePageObject()

describe('Settings page', () => {
  beforeEach(() => {


    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {

    });
    cy.register();
    cy.login();
    cy.visit('/settings');
  })

  it('should provide an ability to update username', () => {
    const userName =
      'testuser_' + faker.string.alpha({ length: 5 }).toLowerCase();
    cy.getByDataCy('Username').clear().type(userName);
    cy.getByDataCy('Submit').click();
    cy.getByDataCy('profile-link').should('contain', userName);
  });

  it('should provide an ability to update bio', () => {
    const randombio = faker.image.avatar();

    cy.getByDataCy('bio').clear().type(randombio);
    cy.getByDataCy('Submit').click();
    cy.getByDataCy('profile-bio').should('have.text',` ` +  randombio + ` `);
  });

  it('should provide an ability to update an email', () => {
    const randomEmail = faker.internet.email().toLowerCase();

    cy.getByDataCy('email').clear().type(randomEmail);
    cy.getByDataCy('Submit').click();
    cy.visit('/settings');
    cy.getByDataCy('email').should('have.value', randomEmail);
  });

  it('should provide an ability to update password', () => {
    const randomPassword = faker.internet.password();

    cy.getByDataCy('password').clear().type(randomPassword);
    cy.getByDataCy('Submit').click();
    cy.visit('/settings');
    cy.getByDataCy('Logout').click();
    cy.login('riot@qa.team', randomPassword);
    cy.visit('/');
    cy.getByDataCy('profile-link').should('contain', 'riot');
  });
});
