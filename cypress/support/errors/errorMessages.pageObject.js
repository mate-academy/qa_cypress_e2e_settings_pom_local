import PageObject from '../PageObject';

class errorMessagePageObject extends PageObject {
  get message() {
    return cy.getByDataCy('error-messages');
  }

  get emailField() {
    return cy.get('[data-cy="email-sign-in"]');
  }

  messageText(message) {
    this.message.should('include.text', message);
  }

  validationMessage(message) {
    this.emailField
      .invoke('prop', 'validationMessage')
      .should('include', message);
  }
}

export default errorMessagePageObject;
