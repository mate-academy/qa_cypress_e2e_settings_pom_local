/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import { SignUpPage } from '../support/pages/SignUpPage';

describe('Sign Up page', () => {
  const signUpPage = new SignUpPage();
  let user;

  before(() => {
    cy.task('clearDatabase'); // czyścimy bazę przed testem
  });

  it('should sign up a new user successfully', () => {
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(12)
    };

    cy.visit('/signup');
    signUpPage.fillForm(user);
    signUpPage.submit();

    signUpPage.successMessage()
      .should('be.visible')
      .and('contain.text', 'Your account has been created'); // dopasuj do komunikatu w aplikacji
  });
});
