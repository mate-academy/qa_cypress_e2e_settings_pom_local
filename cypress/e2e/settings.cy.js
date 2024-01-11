const faker = require('faker');


import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';


const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  const bio = faker.lorem.lines();
  const updUsername = 'update_username';
  const updEmail = faker.internet.email();
  let user;
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

    settingsPage.fillEmptyUsernameField(updUsername);
    settingsPage.clickOnButton('update-settings-button');
    settingsPage.assertUpdUsername(updUsername);
    settingsPage.checkUrlEndPoint(`/profile/${updUsername}`);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(bio);
    settingsPage.clickOnButton('update-settings-button');
    profilePage.assertUserInfo(bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmptyEmailField(updEmail);
    settingsPage.clickOnButton('update-settings-button');
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField('Test1234');
    settingsPage.clickOnButton('update-settings-button');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnButton('logout-button');
    settingsPage.checkUrlEndPoint('http://localhost:3000/');
  });
});