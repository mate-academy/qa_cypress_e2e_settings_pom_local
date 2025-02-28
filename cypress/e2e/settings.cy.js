/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });

    settingPage.visit();
  });

  it.skip('should provide an ability to update username', () => {
    const newUsername = 'UpdatedUsername';
    settingPage.typeName(newUsername);
    settingPage.saveChanges();

    homePage.assertHeaderContainUsername(newUsername.toLowerCase());
    settingPage.logout();
  });

  it.skip('should provide an ability to update bio', () => {
    const newBio = 'asd sagasdg a fgsa gdg asd';
    settingPage.typeBio(newBio);

    settingPage.saveChanges();

    settingPage.visit(`/profile/${user.username.toLowerCase()}`);
    settingPage.checkBioText(newBio);
  });

  it.skip('should provide an ability to update an email', () => {
    const newEmail = 'updated.email@example.com';
    settingPage.typeEmail(newEmail);
    settingPage.saveChanges();

    settingPage.visit();
    settingPage.checkEmailText(newEmail);
    settingPage.logout();
  });

  it.skip('should provide an ability to update password', () => {
    const newPassword = 'NewStrongP@ssw0rd';
    settingPage.typePassword(newPassword);
    settingPage.saveChanges();

    settingPage.visit();
    settingPage.logout();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(`${newPassword}{enter}`);

    homePage.assertHeaderContainUsername(user.username.toLowerCase());
  });

  it('should provide an ability to log out', () => {
    settingPage.logout();
  });
});
