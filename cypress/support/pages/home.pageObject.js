import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get globalFead() {
    return cy.get('.link').contains('Global Feed');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

	clickGlobalFead() {
		this.globalFead.click();
	}

}

export default HomePageObject;
