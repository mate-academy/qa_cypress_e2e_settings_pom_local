/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />
import homePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject.js';

import { generateArticle } from '../support/generateArticle.js';
const articlePage = new ArticlePageObject();

const homePage = new homePageObject();
describe('Article', () => {
let user1;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((newuser) => {
      user1 = newuser;
      
      cy.login(user1.email, user1.username, user1.password).then(() => {
        homePage.visit();
      });
      // settingsPage.visit()
    });
    
  });

  it('should be created using New Article form', () => {
    const { title, description, body } = generateArticle();
    articlePage.clickNewArticleBtn();
    cy.assertPageUrl('/editor');
    articlePage.typeTitle(title);
    articlePage.typeBio(description);
    articlePage.typeBody(body);
articlePage.titleField.should('have.value', title);
    articlePage.bioField.should('have.value', description);
    articlePage.bodyField.should('have.value', body);
    articlePage.publishBtn.should('have.text', 'Publish Article');
    articlePage.clickPublishBtn();

    articlePage.articleTitle.should('have.text', title);
    articlePage.articleBody.should('have.text', body);
    cy.getByDataCy('profile-link').click();

    cy.assertPageUrl('/profile/' + user1.username);
    // cy.get('.preview-link > p').should('have.text', description);
    cy.getByDataCy('preview-description').should('have.text', description);

  });

  it('should be edited using Edit button', () => {
    let { title, description, body } = generateArticle();
  
articlePage.clickNewArticleBtn();
cy.assertPageUrl('/editor');
articlePage.typeTitle(title);
articlePage.typeBio(description);
articlePage.typeBody(body);
    articlePage.clickPublishBtn();

 articlePage.articleTitle.should('have.text', title);
 articlePage.articleBody.should('have.text', body);
 cy.getByDataCy('profile-link').click();

 cy.assertPageUrl('/profile/' + user1.username);
    // cy.get('.preview-link > p').should('have.text', description);
    cy.getByDataCy('preview-description').should('have.text', description);
    articlePage.articleTitle.click();

    articlePage.clickeditArticleBtn();
    let article2 = generateArticle();
   articlePage.titleField.clear();
    articlePage.typeTitle(article2.title);
    articlePage.bioField.clear();
    articlePage.typeBio(article2.description);
    articlePage.bodyField.clear();
    articlePage.typeBody(article2.body);
    articlePage.titleField.should('have.value', article2.title);
    articlePage.bioField.should('have.value', article2.description);
    articlePage.bodyField.should('have.value', article2.body);
     articlePage.publishBtn.should('have.text', 'Update Article');
    articlePage.clickPublishBtn();

    articlePage.articleTitle.should('have.text', article2.title);
    articlePage.articleBody.should('have.text', article2.body);
    cy.getByDataCy('profile-link').click();

    cy.assertPageUrl('/profile/' + user1.username);
    // cy.get('.preview-link > p').should('have.text', article2.description);
    cy.getByDataCy('preview-description').should('have.text', article2.description);
    
  });

  it('should be deleted using Delete button', () => {
     const { title, description, body } = generateArticle();
     articlePage.clickNewArticleBtn();
     cy.assertPageUrl('/editor');
     articlePage.typeTitle(title);
     articlePage.typeBio(description);
     articlePage.typeBody(body);
     articlePage.titleField.should('have.value', title);
     articlePage.bioField.should('have.value', description);
     articlePage.bodyField.should('have.value', body);
     articlePage.publishBtn.should('have.text', 'Publish Article');
    articlePage.clickPublishBtn();

   

    articlePage.articleTitle.should(
      'have.text', title);
    articlePage.articleBody.should('have.text', body);
    cy.getByDataCy('profile-link').click();

    cy.assertPageUrl('/profile/' + user1.username);
   // cy.get('.preview-link > p').should(
   // 'have.text', description);
    cy.getByDataCy('preview-description').should('have.text', description);
    articlePage.articleTitle.click();
    


    articlePage.clickDeleteArticleBtn();
    cy.getByDataCy('no-articles').should(
      'have.text',
      'No articles are here... yet.'
    );
  
  });
});
