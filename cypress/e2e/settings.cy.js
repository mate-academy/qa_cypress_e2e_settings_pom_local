/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();

  let user;
  const newUserName = 'testuser';
  const newUserBio = 'testbio';
  const newUserEmail = 'test@mail.com';
  const newUserPassword = 'test1234';

  before(() => {
    cy.task('db:clear');
    
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password); 
      cy.login(user.email, user.password);
    });
    
    settingsPage.visit();
    
  });

  it('should update username', () => {
    settingsPage.typeUsername(newUserName);
    settingsPage.clickUpdateBtn();
    cy.reload();
    settingsPage.usernameField.should('have.value', newUserName);
  });

  it('should update bio', () => {
    settingsPage.typeBio(newUserBio);
    settingsPage.clickUpdateBtn();
    cy.reload();
    settingsPage.bioField.should('have.value', newUserBio);
  });

  it('should update an email', () => {
    settingsPage.typeEmail(newUserEmail);
    settingsPage.clickUpdateBtn();
    cy.reload();
    settingsPage.emailField.should('have.value', newUserEmail);
  });

  it('should update password', () => {
    settingsPage.typePassword(newUserPassword);
    settingsPage.clickUpdateBtn();
    cy.clearAllCookies();
    cy.login(user.email,user.username,newUserPassword);
    settingsPage.visit();
    settingsPage.emailField.should('have.value', user.email);
  });
});