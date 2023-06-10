import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  usernameLink(username) {
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  newUsernameLink(username) {
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  settingsLink() {
    cy.getByDataCy('/settings')
      .click();
  }
}


export default homePageObject;
