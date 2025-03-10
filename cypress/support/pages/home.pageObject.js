import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }
  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  clickOnSettings() {
    cy.getByDataCy('settings-link').click();
  }


  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
