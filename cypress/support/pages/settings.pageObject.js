import PageObject from '../PageObject';

const selectorMap = {
  username: '[data-cy="settings-username-input"]',
  email: '[data-cy="settings-email-input"]',
  bio:   '[data-cy="settings-bio-input"]',
  password: '[data-cy="settings-password-input"]',
};

class SettingsPageObject extends PageObject {
  url = '/settings';

  get updateSettingsBtn() {
    return cy.get('[data-cy="update-settings-btn"]');
  }

  get logoutBtn() {
    return cy.get('[data-cy="logout-btn"]');
  }

  /**
   * @param {'username'|'email'|'bio'|'password'} field
   * @param {string} newValue
   */
  changeItem(field, newValue) {
    const selector = selectorMap[field];
    if (!selector) {
      throw new Error(`Invalid field key: ${field}`);
    }

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    return cy.get(selector).clear().type(newValue);
  }

  clickOnUpdateSettingsBtn() {
    cy.intercept('PUT', '**/api/user').as('updateUser');
    this.updateSettingsBtn.click();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
  }

  checkUrl(username) {
    cy.url().should('include', `/profile/${username}`);
  }
}

export default SettingsPageObject;
