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
    return this.settingsLink.click();
  }

  assertHeaderContainUsername(username) {
    return this.usernameLink
      .should('contain', username);
  }

  assertUsernameLinkNotExist() {
    return this.usernameLink.should('not.exist');
}
}

export default HomePageObject;
