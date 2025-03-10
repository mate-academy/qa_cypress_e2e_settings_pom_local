/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsFormPage from '../support/pages/settings.form.pageObject';

const settingPage = new SettingsFormPage();

describe('Settings page', () => {
  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      bio = generateArticle;
    });
  });

  let user;
  let userNew;
  let bio;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      userNew = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingPage.visit();
    settingPage.clearUsernameField();
    settingPage.typeUsername(userNew.username);
    settingPage.clickUpdateBtn();
    settingPage.usernameField.should('have.value', userNew.username);
  });

  it('should provide an ability to update bio', () => {
    settingPage.visit();
    settingPage.clearBioField();
    settingPage.typeBio(bio.body);
    settingPage.clickUpdateBtn();
    settingPage.bioField.should('have.value', bio.body);
  });

  it('should provide an ability to update an email', () => {
    settingPage.visit();
    settingPage.clearEmailField();
    settingPage.typeEmail(userNew.email);
    settingPage.clickUpdateBtn();
    settingPage.emailField.should('have.value', userNew.email);
  });

  it('should provide an ability to update password', () => {
    settingPage.visit();
    settingPage.clearPasswordField();
    settingPage.typePassword(userNew.password);
    settingPage.clickUpdateBtn();
    settingPage.passwordField.should('have.value', userNew.password);
  });

  it('should provide an ability to log out', () => {
    settingPage.visit();
    settingPage.clickLogoutBtn();
    cy.contains('.nav-link', 'Sign in').should('exist');
  });
});