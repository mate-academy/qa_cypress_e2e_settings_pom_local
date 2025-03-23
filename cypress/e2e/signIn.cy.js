/// <reference types='cypress' />
/// <reference types='../support' />
import { faker } from '@faker-js/faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;
  let invalidEmail;
  let invalidPassword;

  before(() => {
    invalidEmail = faker.internet.email({ allowUnicode: false });
    invalidPassword = faker.internet.password();

    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.login(user.email, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.login(invalidEmail, invalidPassword);
    signInPage.assertErrorMessageVisible();
    signInPage.assertErrorMessageContains('email or password:is invalid');
  });
});
