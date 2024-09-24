import PageObject from '../PageObject';

class UserProfilePage extends PageObject {

  visit(user) {
    cy.visit(`/profile/${user}`);
  }

  getUsernameInput() {
    return cy.get('[data-cy=Username]');
  }

  getBioInput() {
    return cy.get('[data-cy=bio]');
  }

  getEmailInput() {
    return cy.get('[data-cy=email]');
  }

  getPasswordInput() {
    return cy.get('[data-cy=password]');
  }

  getUpdateButton() {
    return cy.get('[data-cy=update-button]');
  }

  updateUsername(username) {
    this.getUsernameInput().clear().type(username);
    this.getUpdateButton().click();
  }

  updateBio(bio) {
    this.getBioInput().clear().type(bio);
    this.getUpdateButton().click();
  }

  updateEmail(email) {
    this.getEmailInput().clear().type(email);
    this.getUpdateButton().click();
  }

  updatePassword(password) {
    this.getPasswordInput().clear().type(password);
    this.getUpdateButton().click();
  }
  get bio(){
    return cy.get('[data-cy=bio]');
  }

  assertUpdatedBio(bio) {
   this.bio.should('contain', bio);
  }

}

export default UserProfilePage;
