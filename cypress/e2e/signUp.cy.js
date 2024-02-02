/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/SignUpPageObject';
import { faker } from '@faker-js/faker';

describe('Sign Up', () => {
  const signUpPage = new SignUpPageObject();

  beforeEach(() => {
    cy.visit('/sign-up'); // Змініть на актуальний URL сторінки реєстрації
  });

  it('should allow a user to sign up with valid credentials', () => {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    signUpPage.typeEmail(email);
    signUpPage.typeUsername(username);
    signUpPage.typePassword(password);
    signUpPage.clickSignUp();

    // Тут має бути перевірка на успішну реєстрацію, наприклад, перевірка URL або наявності елемента, що з'являється тільки після реєстрації
  });

  // Додайте інші тестові випадки за потреби
});
