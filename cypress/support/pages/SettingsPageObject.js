import PageObject from './PageObject';

class SettingsPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/settings';
  }

  updateUsername(username) {
    cy.get('[data-cy=username]').clear().type(username);
    cy.get('[data-cy=submit]').click();
  }

  updateBio(bio) {
    cy.get('[data-cy=bio]').clear().type(bio);
    cy.get('[data-cy=submit]').click();
  }

  updateEmail(email) {
    cy.get('[data-cy=email]').clear().type(email);
    cy.get('[data-cy=submit]').click();
  }

  updatePassword(password) {
    cy.get('[data-cy=password]').clear().type(password);
    cy.get('[data-cy=submit]').click();
  }
}

export default SettingsPageObject;
