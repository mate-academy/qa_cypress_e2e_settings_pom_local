import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {

  get settingsLink() {
    return cy.contains('.btn', ' Edit Profile Settings');
  }

  get userName() {
    return cy.getByDataCy('username-profile');
  }

  assertProfileContainsInfo(username, bio) {
    this.userName
    .should('contain', username, bio);
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }
}

export default ProfilePageObject;
