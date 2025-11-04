/// <reference types="cypress" />

import articlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add('getByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password
      }
    });
  });

Cypress.Commands.add('login',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/api/users', {
      user: {
        email,
        username,
        password
      }
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage: `https://static.productionready.io/images/smiley-cyrus.jpg`,
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username,
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('auth', response.body.user.token);
    });
  });

Cypress.Commands.add('createArticle', () => {
  const articlePage = new articlePageObject();

  cy.task('generateArticle').then((article) => {
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.assertContainsPublishButton();
    articlePage.clickInPublishButton().then((response) => {
      articlePage.assertContainsArticleTitle(article.title);
      articlePage.assertContainsBody(article.body);
      articlePage.clickInProfileLink();
      articlePage.assertContainsDescription(article.description);
      articlePage.assertContainsTag(article.tag);
      cy.wrap(response).as('response');
    });
  });
});

Cypress.Commands.add('followUser', () => {
  const homePage = new HomePageObject();

  homePage.clickInGlobalFeed();
  homePage.clickInAuthor();
  homePage.followUser();
  homePage.assertFollowedUser();
});