/// <reference types="cypress" />
/// <reference types="../support" />
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.PageObject';
import faker from 'faker';

const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

// the faker didn't work, so I hardcoded the test data. This is a screenshot of the faker error
// https://prnt.sc/THXOTEbzSox4

  const testData = {
  // username: faker.name.firstName(),
  // bio: faker.lorem.word(5),
  // email: faker.internet.email(),
  // password: faker.internet.password({ length: 8 })
  username: 'edited_name',
  bio: 'edited_bio',
  email: 'edited_email@qa.team',
  password: 'Edited_password123'
  };

describe('Settings page', () => {
  let user;
  before(() => {
    //I left this comment here because I have a question why this function is not working
    // cy.task('generateTestData').then((generateTestData) => {
    //   testData = generateTestData;
    // });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.clear().type(testData.username);
    settingsPage.updateBtn.click();
    profilePage.usernameProfile.should('contain', testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.clear().type(testData.bio);
    settingsPage.updateBtn.click();
    profilePage.bioProfile.should('contain', testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear().type(testData.email);
    settingsPage.updateBtn.click();
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    cy.login(testData.email);
  });

  it('should provide an ability to update password', () => {
    cy.getByDataCy('settings-password').clear().type(testData.password);
    settingsPage.updateBtn.click();
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    cy.login(testData.password);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    homePage.navbar.should('contain', 'Sign in');
  });
});
