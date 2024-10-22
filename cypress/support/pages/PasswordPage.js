class PasswordPage {
        updatePassword(newPassword) {
            cy.get('[data-cy=password-input]').clear();
            cy.get('[data-cy=password-input]').type(newPassword); 
            cy.get('[data-cy=update-password-button]').click();
        }
    }
    

export default new PasswordPage();
