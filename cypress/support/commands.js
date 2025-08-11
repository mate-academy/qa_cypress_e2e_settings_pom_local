/* eslint-disable max-len */
// data-cy селектор
Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args);
});

// регистрация + логин через UI, возвращаем user как chainable
Cypress.Commands.add('signupAndLogin', () => {
  const n = Math.ceil(Math.random() * 1000);
  const user = {
    username: `qa_${n}_${Date.now()}`,
    email:    `qa_${n}_${Date.now()}@mail.com`,
    password: 'Qq1!qaAuto123',
  };

  return cy
    .request('POST', '/api/users', { user })
    .its('status')
    .should('be.oneOf', [200, 201])
    .then(() => {
      cy.visit('/user/login');
      cy.get('input[placeholder="Email"]').type(user.email);
      cy.get('input[placeholder="Password"]').type(user.password);
      cy.contains('button', 'Sign in').click();
      cy.location('pathname', { timeout: 10000 }).should('not.include', '/login');
    })
    .then(() => cy.wrap(user)); // <- ВАЖНО: вернуть chainable
});
