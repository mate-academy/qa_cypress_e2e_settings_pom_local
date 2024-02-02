/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/SignInPageObject';

describe('Sign In', () => {
  const signInPage = new SignInPageObject();

  beforeEach(() => {
    cy.visit('/sign-in'); // Змініть на актуальний URL сторінки входу
  });

  it('should allow a user to sign in with correct credentials', () => {
    signInPage.typeEmail('user@example.com'); // Використовуйте дійсні дані для тестування
    signInPage.typePassword('password'); // Використовуйте дійсні дані для тестування
    signInPage.clickSignIn();

    // Тут має бути перевірка на успішний вхід, наприклад, перевірка URL або наявності елемента, що з'являється тільки після входу
  });

  // Додайте інші тестові випадки за потреби
});
