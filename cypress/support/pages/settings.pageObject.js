import PageObject from '../PageObject';

class SetttingsObject extends PageObject {
  url = '/settings';

  get getTypeUser() {
    return cy.getByDataCy('user-name');
  }

  changeTypeUser(data) {
    this.getTypeUser.clear().type(data);
  }

  get getTypeBio() {
    return cy.getByDataCy('bio-type');
  }

  changeTypeBio(data) {
    this.getTypeBio.clear().type(data);
  }


  get getTypeEmail() {
    return cy.getByDataCy('email-type');
  }

  changeTypeEmail(data) {
    this.getTypeEmail.clear().type(data);
  }

  get getTypePassword() {
    return cy.getByDataCy('user-password');
  }

  changeTypePassword(data) {
    this.getTypePassword.clear().type(data);
  }

  getButtonLogout() {
    return cy.getByDataCy('user-logout').click();
  }

  getButtonUpdate() {
    return cy.getByDataCy('data-update').click();
  }
}

export default SetttingsObject;
