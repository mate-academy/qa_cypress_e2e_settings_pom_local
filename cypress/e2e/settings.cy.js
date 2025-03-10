/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const settingPage = new SettingsPageObject();
const signUpPage = new SignUpPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signUpPage.visit('');

      signUpPage.typeUsername(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();
    });
  });

  it('should provide an ability to update username', () => {
    settingPage.visit('');

    settingPage.inputDataToUsernameField(user.username + '-test');
    settingPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username + '-test');
  });

  it('should provide an ability to update bio', () => {
    settingPage.visit('');

    settingPage.inputDataToBioField(user.bio);
    settingPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username);
    settingPage.assertBioText(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingPage.visit('');

    settingPage.inputNewEmail('test@test.ca');
    settingPage.clickUpdateBtn();
    // cy.wait(2000);
    homePage.assertHeaderContainUsername(user.username);
    settingPage.clickSettingsLink();
    settingPage.assertNewEmail('test@test.ca');
  });

  it('should provide an ability to update password', () => {
    settingPage.visit('');

    settingPage.inputNewPassword('NewPassword123!');
    settingPage.clickUpdateBtn();
    // cy.wait(2000);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingPage.visit('');

    settingPage.clickLogoutBtn();
    // cy.wait(2000);
    settingPage.userIsLogout('conduit');
  });
});
