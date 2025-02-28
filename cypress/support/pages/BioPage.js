class BioPage {
    visit() {
        cy.visit('https://conduit.mate.academy/settings'); 
    }

    updateBio(newBio) {
        cy.get('[data-cy=bio-input]').clear(); 
        cy.get('[data-cy=bio-input]').type(newBio); 
        cy.get('[data-cy=update-bio-button]').click(); 
    }

    verifyBio(updatedBio) {
        cy.get('[data-cy=bio-display]').should('contain', updatedBio); 
    }
}

export default new BioPage();
