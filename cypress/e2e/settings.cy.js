/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let userEmail;
  let userName;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      userEmail = generateUser.email;
      userName = generateUser.username;

      cy.login(generateUser.email,
          generateUser.username, generateUser.password);
    });

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername('changed_test');

    settingsPage.updateBtn.click();

    settingsPage.profileUsername.should('contain.text', 'changed_test');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio('changed bio of a user');

    settingsPage.updateBtn.click();

    settingsPage.profileBio.should('contain.text', 'changed bio of a user');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail('test@gg.gg');

    settingsPage.updateBtn.click();

    settingsPage.visit();

    settingsPage.email.should('contain.value', 'test@gg.gg');
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword('P@$$w0rd_test');

    settingsPage.updateBtn.click();

    signInPage.visit();

    signInPage.typePassword('P@$$w0rd_test');
    signInPage.typeEmail(userEmail);

    signInPage.clickSignInBtn();

    cy.getByDataCy('profile-link')
      .should('exist').and('contain.text', userName);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();

    settingsPage.checkLogout();
  });
});
