/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Быстрый селектор по data-cy
     * cy.getByDataCy('settings-save')
     */
    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>

    /**
     * Создать пользователя и залогиниться.
     * Возвращает объект user { username, email, password }.
     */
    signupAndLogin(): Chainable<{
      username: string
      email: string
      password: string
    }>
  }
}
