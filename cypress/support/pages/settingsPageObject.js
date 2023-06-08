import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import PageObject from '../PageObject';

export default class SettingsPageObject extends PageObject {
  url = '/settings';

  editUserName(username) {
     cy.getByDataCy('username/settings')
       .clear()
       .type(`${username}`);
  }

  updateSettingsBtn() {
    cy.getByDataCy('update/btn')
      .click()
  }

  assertNewUserName(username) {
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  editBio(bio) {
    cy.getByDataCy('bio/settings')
    .clear()
    .type(`${bio}`);
  }
  assertNewBio(bio) {
    cy.getByDataCy('/settings')
      .click()
    cy.getByDataCy('bio/settings')  
      .should('contain',bio);
  }

  editEmail(email) {
    cy.getByDataCy('email/settings')
      .clear()
      .type(`${email}`);
  }
  userIsLogOut() {
    cy.getByDataCy('/settings')
      .click()
    cy.get('.btn-outline-danger')
      .click();
  }

  assertUserIsLogOut() {
    cy.getByDataCy('/user/login')
      .should('contain', 'Sign in');
    cy.getByDataCy('/user/register')
      .should('contain', 'Sign up');
  }

  assertNewEmail(username, newEmail, password) {
    cy.getByDataCy('/user/login')
      .click();
    cy.getByDataCy('email-sign-in')
      .type(newEmail);
    cy.getByDataCy('password-sign-in')
      .type(password);
    cy.getByDataCy('sign-in-btn')
      .click();
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

  editPassword(password) {
    cy.getByDataCy('password/settings')
      .clear()
      .type(`${newPassword}`);
  }

  assertNewPassword(username, email, newPassword) {
    cy.getByDataCy('/user/login')
      .click()
    cy.getByDataCy('email-sign-in')
      .type(email);
    cy.getByDataCy('password-sign-in')
      .type(newPassword);
    cy.getByDataCy('sign-in-btn')
      .click();
    cy.getByDataCy(`/profile/${username}`)
      .should('contain', username);
  }

}
