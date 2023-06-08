/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from "../support/pages/settings.pageObject";
import homePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import faker from "faker";

const settingsPage = new SettingsPageObject;
const homePage = new homePageObject;
const signInPage = new SignInPageObject;

describe('Settings page', () => {
  let user;
  const newUser = {
    username: faker.name.firstName().toLowerCase(),
    bio: faker.lorem.words(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {

    settingsPage.updateUsernameField(newUser.username);
    settingsPage.clickOnUpdateBtnSet();

    cy.getByDataCy('username-profile').contains(newUser.username);

  });

  it('should provide an ability to update bio', () => {

    settingsPage.updateBioField(newUser.bio);
    settingsPage.clickOnUpdateBtnSet();

    cy.getByDataCy('bio-profile').contains(newUser.bio);
  });

  it('should provide an ability to update an email', () => {

    settingsPage.updateEmailField(newUser.email);
    settingsPage.clickOnUpdateBtnSet();

    cy.getByDataCy('/settings').click();
    settingsPage.emailField.should('have.value', newUser.email);
  });

  it('should provide an ability to update password', () => {

    settingsPage.updatePasswordField(newUser.password);
    settingsPage.clickOnUpdateBtnSet();

    cy.getByDataCy('/settings').click();
    settingsPage.logOutBtnSet.click();

    cy.login(user.email, user.username, newUser.password);
    settingsPage.visit();
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickOnLogOutBtnSet();
    cy.getByDataCy('/user/login').should('be.visible');
  });
});
