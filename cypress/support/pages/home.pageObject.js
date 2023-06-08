import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  usernameLink() {
    cy.getByDataCy('/profile/')
    .should('contain', username);
  }

  newUsernameLink(username) {
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  clickSettingsLink() {
    cy.getByDataCy('/settings')
      .click();
  }

  clearDatabase() {
    cy.task('db:clear');
  }
}

export default homePageObject;
