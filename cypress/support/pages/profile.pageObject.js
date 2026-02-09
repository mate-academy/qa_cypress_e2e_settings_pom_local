import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get username() {
    return cy.getByDataCy('userName');
  }

  get bio() {
    return cy.getByDataCy('bio');
  }

  assertH4ContainContent(field, expectedText) {
    this[field].should('contain', expectedText);
  }
}

export default ProfilePageObject;
