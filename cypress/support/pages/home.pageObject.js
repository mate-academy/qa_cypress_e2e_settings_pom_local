import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

    verifyUsernameLink(username) {
      cy.getByDataCy(`/profile/${username}`)
        .should('contain', username);
    }
  
    verifyNewUsernameLink(username) {
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
