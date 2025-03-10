import PageObject from '../PageObject';

class SettingsUserAccount extends PageObject{
  fillUsernameField(username) {
    cy.getByDataCy('settings-username')
      .clear().type(username);
  }
  assertNewUsername(newusername) {
    cy.getByDataCy('profile-link').should('contain', newusername);
  }

  fillEmailField(email) {
    cy.getByDataCy('settings-email')
    .clear().type(email);
  }

  assertNewEmail(newemail) {
    cy.getByDataCy('settings-email').should('have.value', newemail);
  }

  fillUserBioField(bio) {
    cy.getByDataCy('settings-bio').clear().type(bio);
  }

    assertNewBio(bio) {
      cy.getByDataCy('profile-bio').should('contain', bio);
    }

  fillPasswordField(password) {
    cy.getByDataCy('settings-password-new').clear().type(password);
  }

  clickOnUpdateSettingsBtn() {
    cy.getByDataCy('update-settings-btn').click();
  }
  clickOnLogOutBtn() {
    cy.getByDataCy('settings-logout').click();
  }

  assertLogOutUser(newusername) {
    cy.getByDataCy('profile-link').should('not.exist', newusername);
  }

}

export default SettingsUserAccount;
