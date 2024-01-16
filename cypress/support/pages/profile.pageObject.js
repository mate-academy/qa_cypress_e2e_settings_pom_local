import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile/';

get userInfoBanner() {
    return cy.getByDataCy('user-info');
  }

  assertUserInfo(info) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(6000);
    this.userInfoBanner.should('contain', info);
  }
  

}
export default ProfilePageObject;
