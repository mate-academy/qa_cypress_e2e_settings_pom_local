import PageObject from '../PageObject';

export class SettingsPageObject extends PageObject {
  url = '/settings';

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get updateSettingButton() {
    return cy.getByDataCy('updatesetting-button').click();
  }
 
get logoutbutton() {
  return cy.getByDataCy('logout-button').click();
}

assertUserInfo(username) {
  return cy.getByDataCy('profile-link')
  .contains(username);
}

assertBio(bio) {
  return cy.getByDataCy('bio-field')
  .contains(bio);
}

assertUserLoggedOut() {
        cy.get('.nav-link').should('contain', 'Sign in')
    }






get modal() {
  return cy.get('.swal-title').contains('Update successful!');
}


}
