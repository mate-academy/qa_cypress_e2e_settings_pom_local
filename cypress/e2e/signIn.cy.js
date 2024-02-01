/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password()
    };
    // Предполагается, что у вас есть функция cy.register для регистрации пользователя
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
  });
  
  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    const wrongEmail = `wrong_${user.email}`;
    const wrongPassword = `wrong_${user.password}`;

    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();

    cy.get('[data-cy=error-message]').should('be.visible').and('contain', 'Invalid credentials');
  });
});
