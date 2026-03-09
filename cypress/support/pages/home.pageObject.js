import PageObject from '../PageObject'

class HomePageObject extends PageObject {
  url = '/#/'

  get usernameLink() {
    return cy.getByDataCy('profile-link')
  }

  get titleUsername() {
    return cy.getByDataCy('title-username')
  }

  get titleBio() {
    return cy.getByDataCy('title-bio')
  }

  get errorMessages() {
    return cy.getByDataCy('error-messages')
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username)
  }

  assertErrorMessages() {
    this.errorMessages.should('exist')
  }

  assertTitleUsername(username) {
    this.titleUsername.should('contain', username)
  }

  assertTitleBio(bio) {
    this.titleBio.should('contain', bio)
  }
}

export default HomePageObject
