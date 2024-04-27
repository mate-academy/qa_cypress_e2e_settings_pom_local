import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  checkNotAuthorized() {
    cy.getCookie('drash_sess')
      .then((cookie) => {
        expect(cookie)
          .to.have.property('value', 'null');
      });
  }
}

export default HomePageObject;
