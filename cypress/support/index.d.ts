/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Get element by data-cy attribute
     * @example cy.getByDataCy('settings-username')
     */
    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>

    /**
     * Register a new user via API
     */
    register(
      email?: string,
      username?: string,
      password?: string
    ): Chainable<any>

    /**
     * Log in an existing user via API
     */
    login(
      email: string,
      password?: string
    ): Chainable<any>

    /**
     * Register and login a new user in one step
     */
    registerAndLogin(): Chainable<any>

    /**
     * Clear local storage and auth cookie
     */
    logout(): Chainable<void>
  }
}
