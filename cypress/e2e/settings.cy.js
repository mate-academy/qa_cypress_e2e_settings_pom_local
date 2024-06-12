/// <reference types="cypress" />
/// <reference types="../support" />
import faker from 'faker';
import SettingsPageObject from '../support/pages/settings.pageObject';


const settingPage = new SettingsPageObject();

describe('Settings page', () => {
  before(() => {

  });
  let user;

  const upadteUser = {
    newUrl: faker.lorem.word(),
    newName: faker.lorem.word(),
    newBio: faker.lorem.word(),
    newEmail: faker.internet.email(),
    newPassword: faker.internet.password()
  };
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
    });
    settingPage.visitSettingsPage();
  });

  it('should provide an ability to update username', () => {
    settingPage.clickOnUrlField(upadteUser.newUrl);
    settingPage.clickOnNameField(upadteUser.newName);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.confirmUpdateLink(upadteUser.newName);
  });

  it('should provide an ability to update bio', () => {
    settingPage.clickOnBioField(upadteUser.newBio);
    settingPage.clickOnUpdateSettingsBtn();
  });

  it('should provide an ability to update an email', () => {
    settingPage.clickOnEmailField(upadteUser.newEmail);
    settingPage.clickOnUpdateSettingsBtn();
  });

  it('should provide an ability to update password', () => {
    settingPage.clickOnPasswordfield(upadteUser.newPassword);
    settingPage.clickOnUpdateSettingsBtn();
  });

  it('should provide an ability to log out', () => {
    settingPage.clickOnLogOutBtn();
    settingPage.assertLogout();
  });
});
