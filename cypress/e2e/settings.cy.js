/// <reference types="cypress" />
/// <reference types="../support" />

import SettingPageObject from '../support/pages/settings.pageObject';
import updatedData from '../support/updatedData';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

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
    settings.UpdateSettingsBtn.click();
    settings.AssertUpdatedUsername(newData.username.toLowerCase());
  });

  it('should provide an ability to update bio', () => {
    settings.BioInput.clear();
    settings.BioInput.type(newData.bio);
    settings.UpdateSettingsBtn.click();
    profilePage.AssertUpdatedBio(newData.bio);
  });

  it('should provide an ability to update an email', () => {
    settings.EmailInput.clear();
    settings.EmailInput.type(newData.email);
    settings.UpdateSettingsBtn.click();
    settings.SettingsLinkHeader.click();
    settings.AssertUpdatedEmail(newData.email);
  });

  it('should provide an ability to update password', () => {
    settings.NewPasswordInput.clear();
    settings.NewPasswordInput.type(newData.password);
    settings.UpdateSettingsBtn.click();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.LogoutBtn.click();
    homePage.usernameLink.should('not.exist');
  });
});
