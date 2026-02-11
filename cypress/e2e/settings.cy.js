/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {

  let updatedUser;

  before(() => {
     cy.task('generateUser').then((generateUser) => {
      updatedUser = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    settingsPage.visit();
  });

  // it('should provide an ability to update username', () => {
  //   settingsPage.typeUsername(updatedUser.username);
  //   settingsPage.clickSubmitBtn();
  //   profilePage.assertH4ContainContent('username', updatedUser.username);
    
  // });

  // it('should provide an ability to update bio', () => {
  //   settingsPage.typeBio(updatedUser.bio);
  //   settingsPage.clickSubmitBtn();
  //   profilePage.assertH4ContainContent('bio', updatedUser.bio);
  // });

  // it('should provide an ability to update an email', () => {
  //   settingsPage.typeEmail(updatedUser.email);
  //   settingsPage.clickSubmitBtn();
  //   homePage.clickSettingsLink();

  //   settingsPage.assertEmailFieldContainUpdatedEmail(updatedUser.email);
  // });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(updatedUser.password);
    settingsPage.clickSubmitBtn();

    homePage.clickSettingsLink();
    settingsPage.clickLogoutBtn();

    cy.re_login({
      email: 'riot@qa.team',  
      password: updatedUser.password
    });

    homePage.assertHeaderContainUsername('riot');

  });

  // it('should provide an ability to log out', () => {
  //   settingsPage.clickLogoutBtn();
  //   homePage.assertUsernameLinkNotExist();
  // });
});
