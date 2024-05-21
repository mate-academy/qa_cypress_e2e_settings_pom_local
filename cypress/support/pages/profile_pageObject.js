class ProfileObject {
    visit(user) {
      cy.visit(`/profile/${user}`);
    }
  
    get profileBio() {
      return cy.get('p');
    }
  
    assertProfileContainBio(bio) {
      this.profileBio.should('contain', bio);
    }
  
  }
  
  export const profilePage = new ProfileObject();