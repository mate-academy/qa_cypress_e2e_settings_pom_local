import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {

checkUsernameValue(name) {
  cy.getByDataCy('profile-username')
    .should('contain', name)
}

checkBioValue(bio) {
  cy.getByDataCy('profile-bio')
    .should('contain', bio)
}

checkEmailValue(email) {
  cy.getByDataCy('profile-email')
    .should('contain', email)
}

checkPasswordValue(password) {
  cy.getByDataCy('profile-password')
    .should('contain', password)
}
}

export default ProfilePageObject;
