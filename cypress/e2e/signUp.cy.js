/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    // Очищаем базу перед каждым тестом
    cy.task('db:clear');

    // Генерация динамического пользователя перед каждым тестом
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  });

  it('should allow a user to register successfully', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    // Проверяем, что пользователь попал на главную после регистрации
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow a user to register with existing email', () => {
    // Создаем пользователя через cy.register для негативного сценария
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();
    signUpPage.typeUsername(faker.internet.userName());
    signUpPage.typeEmail(user.email); // тот же email
    signUpPage.typePassword(faker.internet.password());
    signUpPage.clickSignUpBtn();

    // Проверка ошибки
    cy.get('[data-qa=error-messages]')
      .should('be.visible')
      .and('contain', 'email has already been taken');
  });
});
