// cypress/e2e/settings.cy.js
/* eslint-disable max-len */
/* eslint-disable cypress/unsafe-to-chain-command */
import { faker } from '@faker-js/faker';
import SettingsPage from '../support/pages/SettingsPage';

const page = new SettingsPage();

describe('Settings page', () => {
  let user;

  // хелпер: переход на Settings через хедер + ждем заголовок
  function goToSettingsViaHeader() {
    cy.contains('a', 'Settings', { timeout: 10000 }).click();
    cy.location('pathname').should('eq', '/settings');
    cy.contains('h1', 'Your Settings').should('be.visible');
  }

  beforeEach(() => {
    cy.intercept('PUT', '/api/user').as('updateUser');

    // создаем пользователя и логинимся (кастомная команда из cypress/support/commands.js)
    cy.signupAndLogin().then((u) => { user = u; });

    // надежнее идти на главную, а затем к Settings по ссылке
    cy.visit('/');
    goToSettingsViaHeader();
  });

  it('updates username', () => {
    // безопасный ник: буква в начале, далее буквы/цифры, нижний регистр
    const newUsername =
      faker.string.alpha({ length: 1, casing: 'lower' }) +
      faker.string.alphanumeric({ length: 7, casing: 'lower' });

    page.username().clear().type(newUsername);
    page.save().click();

    cy.wait('@updateUser').its('response.statusCode')
      .should('be.oneOf', [200, 201]);

    // приложение уходит на профиль нового юзера
    cy.location('pathname', { timeout: 20000 })
      .should('eq', `/profile/${newUsername}`);

    cy.contains(newUsername, { matchCase: false }).should('be.visible');
  });

  it('updates bio', () => {
    const bio = faker.lorem.sentence();

    page.bio().clear().type(bio);
    page.save().click();

    cy.wait('@updateUser').its('response.statusCode')
      .should('be.oneOf', [200, 201]);

    // сверяем уже после повторного входа на страницу
    goToSettingsViaHeader();
    page.bio().should('have.value', bio);
  });

  it('updates email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    page.email().clear().type(newEmail);
    page.save().click();

    cy.wait('@updateUser').its('response.statusCode')
      .should('be.oneOf', [200, 201]);

    // БЭК ожидает заголовок Authorization: Token <jwt>, берем jwt из cookie `auth`
    cy.getCookie('auth').then((cookie) => {
      expect(cookie, 'auth cookie').to.exist;
      const token = cookie.value;

      cy.request({
        method: 'GET',
        url: '/api/user',
        headers: { Authorization: `Token ${token}` },
      })
        .its('body.user.email')
        .should('eq', newEmail);
    });
  });

  it('updates password and can login with it', () => {
    const newPass = `Qq1!${faker.string.alphanumeric(8)}`;

    page.newPassword().clear().type(newPass);
    page.save().click();

    cy.wait('@updateUser').its('response.statusCode')
      .should('be.oneOf', [200, 201]);

    // выходим
    page.logout().click();
    cy.location('pathname').should('eq', '/login'); // редирект есть, но это 404-роут у Next-а

    // идем на реальный роут логина приложения
    cy.visit('/user/login');

    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(newPass);
    cy.contains('button', 'Sign in').click();

    cy.location('pathname', { timeout: 10000 }).should('not.include', '/login');
  });

  it('logout redirects to login', () => {
    page.logout().click();
    cy.location('pathname').should('eq', '/login');
  });
});
