/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />
import SettingPageObject from '../support/pages/settings.pageObject';
import updatedData from '../support/updatedData';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
// import { sign } from "crypto";

// import { notEqual } from "assert";
const settings = new SettingPageObject();
const newData = updatedData;
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    settings.visit();
    });
  

  it('should provide an ability to update username', () => {
    settings.UsernameInput.clear();
    settings.UsernameInput.type(newData.username);
    settings.UpdateSettingsBtn;
    settings.AssertUpdatedUsername(newData.username.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    settings.BioInput.type(newData.bio);
    settings.UpdateSettingsBtn;
    profilePage.AssertUpdatedBio(newData.bio);
  });

  it('should provide an ability to update an email', () => {
    settings.EmailInput.clear();
    settings.EmailInput.type(newData.email);
    settings.UpdateSettingsBtn;
    cy.wait(2000);
    settings.SettingsLinkHeader;
    settings.AssertUpdatedEmail(newData.email);
  });

  it('should provide an ability to update password', () => {
    settings.NewPasswordInput.type(newData.password);
    settings.UpdateSettingsBtn;
    cy.wait(2000);
    settings.SettingsLinkHeader;
    settings.LogoutBtn;

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newData.password);
    signInPage.signInBtn.click();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.SettingsLinkHeader;
    settings.LogoutBtn;
    homePage.assertHeaderContainSignInLink();
    
  });
});
