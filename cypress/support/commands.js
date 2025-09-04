/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('registerViaApi', (email, username, password) => {
  return cy
    .request({
      method: 'POST',
      url: '/api/users',
      failOnStatusCode: false,
      body: { user: { email, username, password } },
    })
    .then((res) => {
      if (res.status === 200) return;

      const errs = res.body?.errors || {};
      const emailTaken =
        Array.isArray(errs.email) &&
        errs.email.some((m) => /taken/i.test(m));

      if (res.status === 422 && emailTaken) return;

      expect(res.status, JSON.stringify(res.body)).to.eq(200);
    });
});

Cypress.Commands.add('register', (email, username, password) => {
  return cy.registerViaApi(email, username, password);
});

Cypress.Commands.add('auth', (email, password) => {
  return cy
    .request({
      method: 'POST',
      url: '/api/users/login',
      failOnStatusCode: false,
      body: { user: { email, password } },
    })
    .then((res) => {
      expect(res.status, JSON.stringify(res.body)).to.eq(200);

      const loggedUser = res.body?.user;

      cy.window().then((win) => {
        try {
          win.localStorage.setItem('user', JSON.stringify(loggedUser));
        } catch {}
      });

      if (loggedUser?.token) {
        cy.setCookie('auth', loggedUser.token, { log: false });
      }
    });
});

Cypress.Commands.add('loginUI', (email, password) => {
  cy.visit('/user/login');

  cy.getByDataCy('signin-email').as('email');
  cy.get('@email').clear();
  cy.get('@email').type(email);

  cy.getByDataCy('signin-password').as('pwd');
  cy.get('@pwd').clear();
  cy.get('@pwd').type(password, { log: false });

  cy.intercept('POST', '**/api/users/login').as('login');
  cy.getByDataCy('signin-submit').click();

  cy.wait('@login').its('response.statusCode').should('eq', 200);

  cy.getByDataCy('nav-settings', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('login', (email, password) => {
  return cy.loginUI(email, password);
});

Cypress.Commands.add('forceLoginScreen', () => {
  cy.window().then((win) => {
    try { win.localStorage.removeItem('user'); } catch {}
  });

  cy.clearCookie('auth', { log: false });
  cy.visit('/user/login');

  cy.getByDataCy('signin-email', { timeout: 10000 }).should('be.visible');
});
