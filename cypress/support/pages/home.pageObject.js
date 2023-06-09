import PageObject from '../PageObject';

class homePageObject extends PageObject {
  url = '/#/';

  get profileLink() {
    return cy.getByDataCy('/profile/');
  }
  
//select the header area
  get navbar() {
    return cy.get('.navbar');
  }
}

export default homePageObject;
