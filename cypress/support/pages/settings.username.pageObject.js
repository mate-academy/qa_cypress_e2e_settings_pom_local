class SettingsUsername {
  updateUsername(newUsername) {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[placeholder="Username"]').clear().type(newUsername);
    cy.get('button').contains('Update Settings').click();
  }
}

export default new SettingsUsername();
