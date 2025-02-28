import PageObject from '../PageObject';

export class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField() {
       return cy.getByDataCy('update-username');
    }

    typeUsername(username) {
        this.usernameField.clear().type(username);
      }

    assertProfilePage(username) {
        return cy.url().should('contain', `/profile/${username}`);
      }

      get submitBtn() {
        return cy.getByDataCy('submit-btn');
      }

      submitForm() {
        this.submitBtn.click();
      }

    get bioField() {
        return cy.getByDataCy('update-bio');
      }

      typeBio(bio) {
        this.bioField.type(bio);
      }

      get emailField() {
        return cy.getByDataCy('update-email');
      }

      typeEmail(email) {
        this.emailField.clear().type(email);
      }

      get passwordField() {
        return cy.getByDataCy('update-password');
      }

      typePassword(password) {
        this.passwordField.type(password);
      }

      get logoutBtn() {
        return cy.getByDataCy('logout-btn');
      }

      logout() {
        this.logoutBtn.click();
      }

}
