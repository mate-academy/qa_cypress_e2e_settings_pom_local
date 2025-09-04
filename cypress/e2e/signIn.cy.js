/// <reference types="cypress" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  // Wymagane: czyszczenie DB w każdym teście
  beforeEach(() => { cy.task('db:clear'); });

  let user;

  before(() => {
    cy.task('generateUser').then((u) => { user = u; });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(faker.internet.password({ length: 12 }));
    cy.intercept('POST', '**/api/users/login').as('badLogin');
    signInPage.clickSignInBtn();

    cy.wait('@badLogin').its('response.statusCode').should('eq', 422);

    signInPage.errorList
      .should('be.visible')
      .invoke('text')
      .should((t) => {
        expect(t.toLowerCase()).to.match(/email or password[:]?\s*is invalid/);
      });
  });
});
