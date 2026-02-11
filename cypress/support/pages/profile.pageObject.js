import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get username() {
    return cy.getByDataCy('profile-username');
  }

  get bio() {
    return cy.getByDataCy('profile-bio');
  }

  assertH4ContainContent(field, expectedText) {
    this[field].should('contain', expectedText);
  }
}

export default ProfilePageObject;
