import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUsernameLinkNotExist() {
  this.usernameLink.should('not.exist');
}
}

export default HomePageObject;
