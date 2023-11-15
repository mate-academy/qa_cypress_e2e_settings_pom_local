import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register/';

  // get usernameLink() {
  //   return cy.getByDataCy('profile-link');
  // }

  // get signUpLink() {
  //   return cy.get('[href="/user/register"]');
  // }

  // assertHeaderContainUsername(username) {
  //   this.usernameLink
  //     .should('contain', username);
  // }

  // clickOnSignUpLink() {
  //   this.signUpLink.click();
  // }
}

export default SignUpPageObject;