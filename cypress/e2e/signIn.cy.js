// cypress/e2e/signIn.cy.js
import SignInPageObject from '../../support/pages/signIn.pageObject';
import HomePageObject from '../../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.request('POST', '/api/users', {
        user: {
          email: user.email,
          username: user.username,
          password: user.password,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail('wrong@example.com');
    signInPage.typePassword('WrongPass123!');
    signInPage.clickSignInBtn();

    signInPage
      .getError()
      .should('be.visible')
      .and('contain', 'email or password is invalid');
  });
});
