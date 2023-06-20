/// <reference types="cypress" />
/// <reference types="../support" />
import ArticlePageObject from "../support/pages/article.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.articleTitle
      .type(article.title);
    articlePage.articleDescription
      .type(article.description);
    articlePage.articleBody
      .type(article.body);
    articlePage.articleTags
      .type(article.tag + '{enter}');
    articlePage.clickOnPublishBtn();

    articlePage.assertArticleCreated(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const endpoint = response.body.article.slug;
        cy.visit(`article/${endpoint}`);
      });

    articlePage.clickOnEditBtn();

    articlePage.articleTitle
      .type(article.title);
    articlePage.articleDescription
      .type(article.description);
    articlePage.articleBody
      .type(article.body);
    articlePage.articleTags
      .type(article.tag + '{enter}');
    articlePage.clickOnPublishBtn();

    articlePage.assertArticleUpdated(article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');

    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const endpoint = response.body.article.slug;
        cy.visit(`article/${endpoint}`);
      });

    articlePage.clickOnDeleteBtn();

    articlePage.assertArticleDeleted();
  });
});
