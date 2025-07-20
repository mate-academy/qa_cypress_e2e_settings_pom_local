/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear'); // Очищаємо базу даних
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password); // Реєструємо користувача
      cy.login(user.email, user.password); // Логінимо його програмно
    });
  });
  
  it('should provide an ability to log in with existing credentials', () => {
    cy.visit('/'); // Просто переходимо на головну сторінку, де має бути залогінений користувач
    // cy.pause(); // Можна прибрати після успішної відладки

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongpassword'); // Неправильний пароль
    signInPage.clickSignInBtn();

    cy.get('.error-messages').should('contain', 'is invalid'); 
  });
});
