/// <reference types="cypress" />
/// <reference types="../support" />


import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const updateSettings = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;
  let bio = 'zhazam';
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then(generateUser, () => {
        user = generateUser;
      });
    cy.login();
    updateSettings.visit();
  });

  it('should provide an ability to update username', () => {
    updateSettings.typeUsername(user.username);
    updateSettings.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
  it('should provide an ability to update bio', () => {
    updateSettings.typeBio(bio);
    updateSettings.clickUpdateBtn();

  });

  it('should provide an ability to update an email', () => {
    updateSettings.typeEmail(user.email);
    updateSettings.clickUpdateBtn();
  });

  it('should provide an ability to update password', () => {
    updateSettings.typePassword(user.password);
    updateSettings.clickUpdateBtn();
  });

  it('should provide an ability to log out', () => {
    updateSettings.visit();
    updateSettings.clickDeleteBtn();
  });
});
