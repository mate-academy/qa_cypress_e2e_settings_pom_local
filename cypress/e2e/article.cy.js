/*eslint-disable*/
/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';

describe('Article Management', () => {
  const articlePage = new ArticlePageObject();
  const articleTitle = 'My Test Article';
  const newTitle = 'My Updated Article';
  const description = 'desc';
  const body = 'body';

  it('should create, edit, and delete an article', () => {
    articlePage.visit();
    articlePage.createArticle({ title: articleTitle, description, body });
    articlePage.assertArticleExists(articleTitle);

    articlePage.editArticle(newTitle);
    articlePage.assertArticleUpdated(newTitle);

    articlePage.deleteArticle();
    articlePage.assertArticleDeleted(newTitle);
  });
});
