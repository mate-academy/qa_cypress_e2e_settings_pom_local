import SignInPageObject from "./signIn.pageObject";

class SettinsPageObject extends SignInPageObject {
  url = '/settings';

  loginUser() {
    cy.login();
  }

  updateUsername(username) {
    cy.getByDataCy('username-settings')
      .clear()
      .type(username);
  }

  updateBio(bio) {
    cy.getByDataCy('bio-settings')
      .type(bio);
  }

  updateEmail(email) {
    cy.getByDataCy('email-settings')
      .clear()
      .type(email);
  }

  updatePassword(password) {
    cy.getByDataCy('password-settings')
      .type(password);
  }

  clickSubmitButton() {
    cy.getByDataCy('submit-settings')
      .click();
  }

  assertBio(bio) {
    cy.getByDataCy('bio-settings')
      .should('contain', bio);
  }

  logOut() {
    cy.getByDataCy('/settings')
      .click();
    cy.get('.btn-outline-danger')
      .click();
    cy.wait(1500);
  };

  assertLogOut() {
    cy.getByDataCy('/user/login')
      .should('contain', 'Sign in');
    cy.getByDataCy('/user/register')
      .should('contain', 'Sign up');
  } 

  assertPassword(username, email, password) {
    cy.getByDataCy('/user/login')
      .click();
    cy.getByDataCy('email-sign-in')
      .type(email);
    cy.getByDataCy('password-sign-in')
      .type(password);
    cy.getByDataCy('sign-in-btn')
      .click();
  };
};

export default SettinsPageObject;