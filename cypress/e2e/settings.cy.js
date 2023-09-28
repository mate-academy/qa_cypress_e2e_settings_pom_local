/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import settingPageObject from '../support/pages/setting.PageObject';
import homePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

describe('Settings page', () => {
  const settingsPage = new settingPageObject();
  const signInPage = new SignInPageObject();
  const homePage = new homePageObject();

  const bio = faker.lorem.words();
  let randomNumber = Math.ceil(Math.random(1000) * 1000);
  let userName = faker.name.firstName() + `${randomNumber}`
  const user ={
    username: userName.toLowerCase(),
    email: 'test'+`${randomNumber}`+'@mail.com',
    password: '12345Qwert!',
  };

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.login();
    cy.visit('/');
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {

    settingsPage.fillUsernameField(user.username);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {

    settingsPage.fillBioField(bio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkBio(bio);
  });

  it('should provide an ability to update an email', () => {

    settingsPage.fillEmailField(user.email);
    settingsPage.clickUpdateBtn();
    settingsPage.checkEmail(user.email);
  });

  it('should provide an ability to update password', () => {

    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.passwordField.type(newPassword);
    signInPage.signInBtn.click();
    homePage.assertUsernameInHeader('riot');
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickLogOutBtn();
    homePage.checkLogOut('riot');
  });
});
});
