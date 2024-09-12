import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile/'

  get userInfoBanner () {
    return cy.getByDataCy('user-info')
  }

  assertUserInfo (info) {
    this.userInfoBanner.should('contain', info)
  }
}
export default ProfilePageObject;
