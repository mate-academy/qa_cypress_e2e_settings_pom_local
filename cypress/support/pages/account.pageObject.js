import PageObject from '../PageObject';

class AccountPageObject extends PageObject {

    assertBio(bio) {
      cy.getByDataCy('user-bio').should('contain', bio); 
     }
    }

export default AccountPageObject;