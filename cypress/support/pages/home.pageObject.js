import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/';

  get usernameLink() {
    return cy.getByDataCy('/profile');
  }

  assertUsernameLink(username) {
    this.usernameLink.should('contain', username);
  }

  assertLogOut() {
    cy.getByDataCy('/user/register').should('exist');
    cy.getByDataCy('/user/login').should('exist');
  }
}

export default homePageObject;
