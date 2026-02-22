/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';

describe('Sign Up page', () => {
  const signUp = new SignUpPageObject();

  beforeEach(() => {
    cy.task('db:clear');
    signUp.open();
  });

  it('should register user', () => {
    cy.task('generateUser').then((user) => {
      cy.getByDataCy('title-sign-in').should('contain.text', 'Sign up');
      signUp.register(user);
    });
  });
});
