class SettingsBio {
  updateBio(newBio) {
    // eslint-disable-next-line cypress/unsafe-to-chain-command, max-len
    cy.get('[placeholder="Short bio about you"]').clear().type(newBio);
    cy.get('button').contains('Update Settings').click();
  }
}

export default new SettingsBio();