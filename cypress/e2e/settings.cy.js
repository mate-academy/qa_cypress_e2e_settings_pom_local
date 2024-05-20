/// <reference types="cypress" />
/// <reference types="../support" />

import { settingsPage } from '../support/pages/settings_pageObject';
import { homePageObject } from '../support/pages/home.pageObject';
import { profilePage } from '../support/pages/profile_pageObject';

describe('Settings page', () => {
  let user;
  let nextUser;
  before(() => {
    cy.task('generateUser').then((generateUser)=>{
      user = generateUser;
      return cy.task('generateUpdateData');
    }).then((generateUpdateData)=>{
      nextUser = generateUpdateData;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
  });

  it.skip('should provide an ability to update username', () => {

    settingsPage.visit();
    settingsPage.fillUsernameField(nextUser.usernameChanged);
    settingsPage.clickUpdateButton();
    homePageObject.assertHeaderContainUsername(nextUser.usernameChanged);

  });

  it.skip('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.fillBioField(nextUser.bioChanged);
    settingsPage.clickUpdateButton();
    profilePage.visit(user.username);
    profilePage.assertProfileContainBio(nextUser.bioChanged);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.fillEmailField(nextUser.emailChanged);
    settingsPage.clickUpdateButton();
    settingsPage.visit();
    settingsPage.assertTheEmailField(nextUser.emailChanged); // 1 way to check!

    settingsPage.clickLogoutButton();  // the second way to check = log out and log in with already changed creds.
    cy.loginAuth(nextUser.emailChanged, user.password);
    settingsPage.visit();
    settingsPage.assertTheEmailField(nextUser.emailChanged);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.fillPasswordField(nextUser.passwordChanged);
    settingsPage.clickUpdateButton();

    // assert that the password is changed;
    settingsPage.clickLogoutButton();
    cy.loginAuth(user.email, nextUser.passwordChanged);
    settingsPage.visit();
    //  when the user is logged in -  the username should be visible at header nav.menu;
    homePageObject.assertHeaderContainUsername(user.username); 
    

  });

  it.skip('should provide an ability to log out', () => {

    settingsPage.visit();
    settingsPage.clickLogoutButton();

    cy.getCookie('auth').should('not.exist');

  });
});
