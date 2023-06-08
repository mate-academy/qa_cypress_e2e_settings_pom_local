
import faker from "faker";
import SettingsPageObject from '../support/pages/settingsPageObject';
import homePageObject from "../support/pages/home.pageObject";
/// <reference types="cypress" />
/// <reference types="../support" />

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateDataUserSettings').then(generateDataUserSettings => {
      user = generateDataUserSettings;
    cy.login();
    settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {

  settingsPage.editUserName(user.newUserName);
  settingsPage.updateSettingsBtn();
  settingsPage.assertNewUserName(user.newUserName)
 });
  
  it('should provide an ability to update bio', () => {
  settingsPage.editBio(user.bio);
  settingsPage.updateSettingsBtn();
  settingsPage.assertNewBio(user.bio)
  });

  it('should provide an ability to update an email', () => {
  settingsPage.editEmail(user.newEmail);
  settingsPage.updateSettingsBtn();
  settingsPage.userIsLogOut();
  settingsPage.assertNewEmail(user.username, user.newEmail, user.password)
  });

  it('should provide an ability to update password', () => {
  settingsPage.editPassword(user.newPassword);
  settingsPage.updateSettingsBtn();
  settingsPage.userIsLogOut();
  settingsPage.assertNewPassword(user.username, user.email, user.newPassword)
  });

  it('should provide an ability to log out', () => {
  settingsPage.userIsLogOut();
  settingsPage.assertUserIsLogOut()
  });
});
