import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  constructor() {
    super('/#/'); // Set default home page URL
  }

  get usernameLink() {
    return cy.get('[data-qa=profile-link]'); // Ensure data-qa attribute exists in UI
  }

  assertHeaderContainsUsername(username) { // Fixed method name
    this.usernameLink.should('contain', username);
  }
}

export default HomePageObject;

