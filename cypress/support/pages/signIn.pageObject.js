import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get email()     { return cy.getByDataCy('signin-email'); }
  get password()  { return cy.getByDataCy('signin-password'); }
  get submit()    { return cy.getByDataCy('signin-submit'); }
  get errorList() { return cy.getByDataCy('error-list'); }

  visit() { super.visit(this.url); }

  typeEmail(v) {
    this.email.clear();
    this.email.type(v);
  }

  typePassword(v) {
    this.password.clear();
    this.password.type(v, { log: false });
  }

  clickSignInBtn() {
    this.submit.click();
  }
}

export default SignInPageObject;
