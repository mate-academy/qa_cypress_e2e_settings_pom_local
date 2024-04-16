import PageObject from '../PageObject'

class ProfilePage extends PageObject {
  get bioField() {
    return cy.getByDataCy('bio-profile-field')
  }
}

export default ProfilePage
