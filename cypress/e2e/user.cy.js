/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/UserPageObject';

describe('User actions', () => {
  const userPage = new UserPageObject();

  beforeEach(() => {
    cy.login(); // Припускаємо, що у вас є команда для входу користувача
    cy.visit('/user-profile'); // Змініть на актуальний URL сторінки профілю користувача
  });

  it('should allow a user to follow another user', () => {
    userPage.clickFollow();

    // Тут має бути перевірка на успішну підписку, наприклад, перевірка тексту кнопки на "Unfollow"
  });

  it('should allow a user to unfollow another user', () => {
    userPage.clickUnfollow();

    // Тут має бути перевірка на успішну відписку, наприклад, перевірка тексту кнопки на "Follow"
  });

  // Додайте інші тестові випадки за потреби
});
