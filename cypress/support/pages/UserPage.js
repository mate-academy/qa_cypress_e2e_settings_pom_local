class UserPage {
    AssertUserUsername(edit) {
        cy.url().should('include', edit.username);
    }

    AssertUserBio(edit) {
        cy.getByDataCy('user-bio-field').should('contain', edit.bio);
    }
}
  
export const userPage = new UserPage();