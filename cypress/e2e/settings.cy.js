/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require('faker');


import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {

  let user;

  const newUserName = faker.name.firstName().toLowerCase();
  const newUserBio = faker.random.word().toLowerCase();
  const newUserEmail = `${newUserName}`+'@gmail.com';
  const newUserPassword = 'blablaBLA123!';

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    cy.log('Updating username...');
    settingsPage.fillEmptyUsernameField(newUserName);
    settingsPage.clickOnButton('update-settings-button');
    settingsPage.assertUpdUsername(newUserName);
    cy.log('Username updated successfully.');
  });
  

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(newUserBio);
    settingsPage.clickOnButton('update-settings-button');
    profilePage.assertUserInfo(newUserBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmptyEmailField(newUserEmail);
    settingsPage.clickOnButton('update-settings-button');
    settingsPage.assertUpdEmail(newUserEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(newUserPassword);
    settingsPage.clickOnButton('update-settings-button');
    settingsPage.assertUpdPassword(newUserPassword);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnButton('logout-button');
    settingsPage.checkUrlEndPoint('http://localhost:3000/');
  });
});
