import PageObject from '../PageObject'; 

class profilePageObject extends PageObject {

usernameValue(name) {
  cy.getByDataCy('profile-username')
    .should('contain', name);
}

bioValue(bio) {
  cy.getByDataCy('profile-bio')
    .should('contain', bio);
}
}

export default profilePageObject;