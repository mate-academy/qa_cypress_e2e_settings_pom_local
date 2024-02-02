import PageObject from './PageObject';

import PageObject from './PageObject';

class UserPageObject extends PageObject {
  constructor() {
    super();
    // Предположим, что URL профиля пользователя может быть динамическим или статическим
    // Если динамический, то метод visit() можно переопределить для приема username
  }

  followUser() {
    cy.get('[data-cy=follow-btn]').click();
  }

  unfollowUser() {
    cy.get('[data-cy=unfollow-btn]').click();
  }

  // Методы для проверки состояния кнопки подписки, если необходимо
  assertFollowed() {
    cy.get('[data-cy=follow-btn]').should('contain', 'Unfollow');
  }

  assertUnfollowed() {
    cy.get('[data-cy=follow-btn]').should('contain', 'Follow');
  }
}

export default UserPageObject;
