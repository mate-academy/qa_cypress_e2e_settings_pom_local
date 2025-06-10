import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  visit(username) {
    cy.visit(`/profile/${username}`);
  }

  updateBio(bio) {
    cy.get('[data-cy=bio]').clear();
    cy.get('[data-cy=bio]').type(bio);
    cy.get('[data-cy=save-settings]').click();
  }

  updateUsername(username) {
    cy.get('[data-cy=username]').clear();
    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=save-settings]').click();
  }

  updateEmail(newEmail) {
    cy.get('[data-cy=settings-email]').clear();
    cy.get('[data-cy=settings-email]').type(newEmail);
    cy.get('[data-cy=save-settings]').click();
  }

  updatePassword(oldPassword, newPassword) {
    cy.get('[data-cy=old-password]').type(oldPassword);
    cy.get('[data-cy=new-password]').type(newPassword);
    cy.get('[data-cy=save-settings]').click();
    cy.contains(
      '.success-message',
      'Password updated successfully'
    ).should('exist');
  }

  logout() {
    cy.contains('Log Out').click();
  }

  assertUpdateSuccess() {
    cy.contains('.success-message', 'Update successful').should('exist');
  }
}

export default ProfilePageObject;
