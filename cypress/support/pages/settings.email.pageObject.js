class SettingsEmail {
  updateEmail(newEmail) {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[placeholder="Email"]').clear().type(newEmail);
    cy.get('button').contains('Update Settings').click();
  }
}

export default new SettingsEmail();