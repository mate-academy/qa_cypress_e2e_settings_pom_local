/*eslint-disable*/
/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';

describe('Article Management', () => {
  const articlePage = new ArticlePageObject();

  it('should be created using New Article form', () => {
    const title = faker.lorem.words(5);
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    articlePage.createArticle({ title, description, body });
    articlePage.assertArticleExists(title);
  });

  it('should be edited using CustomLink', () => {
    const newTitle = faker.lorem.words(6);
    articlePage.editArticle(newTitle);
    articlePage.assertArticleUpdated(newTitle);
  });

  it('should be deleted using Delete button', () => {
    const title = 'Some Title'; // Use the correct title here
    articlePage.deleteArticle();
    articlePage.assertArticleDeleted(title);
  });

  it('should create, edit, and delete an article', () => {
    const articleTitle = 'My Test Article';
    const newTitle = 'My Updated Article';
    const description = 'desc';
    const body = 'body';

    articlePage.visit();
    articlePage.createArticle({ title: articleTitle, description, body });
    articlePage.assertArticleExists(articleTitle);

    articlePage.editArticle(newTitle);
    articlePage.assertArticleUpdated(newTitle);

    articlePage.deleteArticle();
    articlePage.assertArticleDeleted(newTitle);
  });
});
