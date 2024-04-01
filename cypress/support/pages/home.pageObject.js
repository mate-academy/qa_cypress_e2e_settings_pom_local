import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingsButton() {
    return cy.getByDataCy('settings-button');
  }

  get homePageUrl() {
    return cy.url();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickSettingsButton() {
    this.settingsButton.click();
  }

  assertHomePageUrl () {
    this.homePageUrl.should('eq', 'http://localhost:3000/');
  }
  
}

export default HomePageObject;
