//signInPageObject
import PageObject from '../PageObject.js';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  logInByGUI(email, password) {
    cy.visit(this.url);
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
    cy.location('pathname')
      .should('equal', '/');
  }

  // logInByAPI(email, password) {
  //   cy.visit({
  //     url: `http://localhost:3000/#/`,
  //     method: 'POST',
  //     body: {
  //       user: {
  //         email,
  //         password
  //       }
  //     }
  //   });
  // }
}

export default SignInPageObject;