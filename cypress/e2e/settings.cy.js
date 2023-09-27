/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPage from '../support/pages/settings.PageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPage from '../support/pages/signIn.pageObject';
import faker from 'faker';

const settingsPage = new SettingsPage();
const header = new HomePageObject();
const loginAfterUpdate = new SignInPage();

describe('Settings page', () => {
  let user;
  let updatedUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      updatedUser = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.fillField('username-field', updatedUser.username);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.assertUpdatedUsernameInLink(updatedUser.username);
    header.assertHeaderLink(updatedUser.username);
    settingsPage.assertUpdatedInfoOnUserPage(updatedUser.username);
  });

  it('should provide an ability to update bio', () => {
    
    const updatedBio = faker.lorem.words();
    settingsPage.visit();
    settingsPage.fillField('bio-field', updatedBio);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.assertUpdatedInfoOnUserPage(updatedBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.fillField('email-field', updatedUser.email);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.assertUpdatedField('email-field', updatedUser.email);
    settingsPage.clickOnLogoutBtn();
    loginAfterUpdate.visit();
    loginAfterUpdate.typeEmail(updatedUser.email);
    loginAfterUpdate.typePassword(user.password);
    loginAfterUpdate.clickSignInBtn();
  });

  it('should provide an ability to update password', () => {
    const updatedPassword = 'Pas123!';
    
    settingsPage.visit();
    settingsPage.fillField('password-field', updatedPassword);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.clickOnLogoutBtn();
    loginAfterUpdate.visit();
    loginAfterUpdate.typeEmail(user.email);
    loginAfterUpdate.typePassword(updatedPassword);
    loginAfterUpdate.clickSignInBtn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    header.assertHeaderLink('Sign in');
  });
});
