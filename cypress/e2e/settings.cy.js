/// <reference types="cypress" />
/// <reference types="../support" />

import { SettingsPageObject } from '../support/pages/settings.pageObject';
import {HomePageObject} from '../support/pages/home.pageObject';


const settingPageObject = new SettingsPageObject();


describe('Settings page', () => {
  let user;
  

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    settingPageObject.userNameField.clear().type(user.username);

    settingPageObject.updateSettingButton;
    settingPageObject.assertUserInfo(user.username);
});

  it('should provide an ability to update bio', () => {
    const bio = 'my new bio';
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    settingPageObject.bioField.clear().type(bio);
    settingPageObject.updateSettingButton;
    settingPageObject.assertBio(bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
     const email = 'test@test.com';
    settingPageObject.emailField.clear().type(email);
    settingPageObject.updateSettingButton;
    settingPageObject.assertUserEmail(email);
  });

  it('should provide an ability to update password', () => {
    const email = user.email;
     const login = user.username;

    cy.login(user.email, user.username, user.password);
    settingPageObject.visit();
    const pass = user.password;
    settingPageObject.passwordField.clear().type(pass);
    settingPageObject.updateSettingButton;
    //cy.login(user.email, user.username, pass);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    const bio = user.bio;
    settingPageObject.visit();
    cy.getByDataCy('logout-button').click();
    //cy.login(user.email, user.username, user.password);
    //settingPageObject.visit();
    //settingPageObject.assertBio(bio);
  });
});
