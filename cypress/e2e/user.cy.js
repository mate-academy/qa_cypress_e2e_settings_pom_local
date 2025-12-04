/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('Follow/unfollow button', () => {
  let user;
  let anotherUser;

  beforeEach(() => {
    // Очищаем базу перед каждым тестом
    cy.task('db:clear');

    // Генерация и регистрация основного пользователя
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    cy.register(user.email, user.username, user.password);

    // Генерация и регистрация другого пользователя
    anotherUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
  });

  it('should provide an ability to follow and unfollow another user', () => {
    // Логин основного пользователя
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    // Переход на профиль другого пользователя
    profilePage.visitProfile(anotherUser.username);

    // Подписка
    profilePage.clickFollowBtn();
    profilePage.assertFollowing(true);

    // Отписка
    profilePage.clickFollowBtn();
    profilePage.assertFollowing(false);
  });
});
