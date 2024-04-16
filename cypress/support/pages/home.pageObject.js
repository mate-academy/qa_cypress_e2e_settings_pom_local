import PageObject from '../PageObject'

class HomePageObject extends PageObject {
  url = '/#/'

  get usernameLink() {
    return cy.getByDataCy('profile-link')
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link')
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username)
  }
  assertHeaderContainSignIn() {
    this.signInLink.should('contain', 'Sign in')
  }
}

export default HomePageObject
