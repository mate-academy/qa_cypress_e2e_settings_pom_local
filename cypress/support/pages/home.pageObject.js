import PageObject from '../PageObject';

export class SettingsPageObject extends PageObject {
    url = '/settings';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }
   clickOnLogoutButton() {
        this.logoutButton.click();
    }
  
    assertUserLoggedOut() {
        cy.get('.nav-link').should('contain', 'Sign in')
    }


  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.usernameLink
      .not('contain', username);
  }
}


export default HomePageObject;

