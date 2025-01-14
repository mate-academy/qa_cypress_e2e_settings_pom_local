/// <reference types="cypress" />

interface User {
  username: string;
  email: string;
  password: string;
}

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataCy(selector: string): Chainable<any>;
    register(
      email: string,
      username: string,
      password: string
    ): Chainable<User>;
    login(email: string, username: string, password: string): Chainable<User>;
  }
}
