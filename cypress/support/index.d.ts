/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>
    registerViaApi(email: string, username: string, password: string): Chainable<any>
    register(email: string, username: string, password: string): Chainable<any>
    auth(email: string, password: string): Chainable<any>
    loginUI(email: string, password: string): Chainable<any>
    login(email: string, password: string): Chainable<any>
    forceLoginScreen(): Chainable<any>
  }
}
