import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }
}

export default HomePageObject;
