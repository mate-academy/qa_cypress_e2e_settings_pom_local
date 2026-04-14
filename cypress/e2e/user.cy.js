/// <reference types="cypress" />
/// <reference types="../support" />

describe('Follow/unfollow button', () => {
  let user;
  let author;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((resAuthor) => {
      author = resAuthor;
      cy.register(author.email, author.username, author.password);
      cy.login(author.email, author.username, author.password);

      cy.getCookie('auth').then((cookie) => {
        const token = cookie.value;

        cy.task('generateArticle').then((article) => {
          cy.request({
            method: 'POST',
            url: '/api/articles',
            headers: { Authorization: `Token ${token}` },
            body: {
              article: {
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: [article.tag]
              }
            }
          });
        });
      });
    });

    cy.task('generateUser').then((resUser) => {
      user = resUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    if (user) {
      cy.login(user.email, user.username, user.password);
    }
  });

  it('should provide an ability to follow the another user', () => {
    cy.visit(`/profile/${author.username}`);


    cy.get('button', { timeout: 15000 })
      .contains(`Follow ${author.username}`)
      .should('be.visible')
      .click();


    cy.get('button')
      .contains(`Unfollow ${author.username}`, { timeout: 10000 })
      .should('be.visible');
  });
});