class PageObject {
  visit(url) {
    cy.visit(url || this.url, {
      timeout: 30000,
      failOnStatusCode: false
    });
  }

  get homeLink() {
    return cy.get('.nav-link').contains('Home');
  }

  get settingsLink() {
    return cy.get('.nav-link').contains('Settings');
  }

  get profileLink() {
    return cy.get('.nav-link').contains('Profile');
  }
}
export default PageObject;

class SettingsPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/settings';
  }

  get usernameField() { 
    return cy.get('input[placeholder="Username"]'); 
  }

  get bioField() {
    return cy.get('textarea[placeholder="Short bio about you"]'); 
  }

  get emailField() { 
    return cy.get('input[placeholder="Email"]'); 
  }

  get passwordField() { 
    return cy.get('input[placeholder="New Password"]'); 
  }

  get updateButton() { 
    
    return cy.get('button[type="submit"]').contains('Update Settings'); 
  }
}

export const settingsPage = new SettingsPageObject();