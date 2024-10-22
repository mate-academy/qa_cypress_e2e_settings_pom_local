class SettingsPassword {
  updatePassword(newPassword) {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[placeholder="Password"]').clear().type(newPassword);
    cy.get('button').contains('Update Settings').click();
  }
}

export default new SettingsPassword();