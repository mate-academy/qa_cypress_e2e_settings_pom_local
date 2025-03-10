/// <reference types="cypress" />
/// <reference types="../support" />
import faker from 'faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

const user = {
  email: faker.internet.email().toLowerCase(), 
  username: faker.name.firstName().toLowerCase(), 
  password: faker.random.word()
};

describe('Settings page', () => {

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
  settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateButton();
    homePage.assertHeaderContainUsername(newUsername);
    settingsPage.clickUserInfo();
    settingsPage.assertUpdatedUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words();

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateButton();
    settingsPage. assertUpdatedBio(newBio);
    settingsPage.clickUserInfo();
    settingsPage.assertUpdatedBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateButton();
    settingsPage.clickLogoutButton();
    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Qwe123!!!';

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateButton();
    settingsPage.clickLogoutButton();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
});
