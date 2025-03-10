import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get findSignUpLink() {
    return cy.getByDataCy('signUp-link');
  }

  clickSignUpLink() {
    this.findSignUpLink.click();
  }

  get findFollowBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollowBtn() {
    this.findFollowBtn.first().click();
  }
}

export default UserPageObject;
