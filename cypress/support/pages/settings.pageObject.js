import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

get updateUserName() {

    return cy.getByDataCy('username-field');
    
}

get submitButton() {

   return cy.getByDataCy('submit-button');

}

get updateShortBio () {

    return cy.getByDataCy('shortbio-link');
    
}

get updateEmail () {

    return cy.getByDataCy('email-field');

}

get updatePassword () {
    return cy.getByDataCy('password-field');
    

}

get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }


}
export default SettingsPageObject;