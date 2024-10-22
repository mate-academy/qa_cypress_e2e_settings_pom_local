class UsernamePage {
    updateUsername(newUsername) {
        cy.get('[data-cy=username-input]').clear();
        cy.get('[data-cy=username-input]').type(newUsername); // Safe chaining
        cy.get('[data-cy=update-username-button]').click();
    }
}

export default new UsernamePage();
