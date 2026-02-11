import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profiles/:username';

  get username() {
    return cy.getByDataCy('profile-username');
  }

  get bio() {
    return cy.getByDataCy('profile-bio');
  }

  assertH4ContainContent(field, expectedText) {
    return this[field].should('contain', expectedText);
  }
}

export default ProfilePageObject;
