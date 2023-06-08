/// <reference types="cypress" />
/// <reference types="../support" />

import faker from "faker";
import settingsPageObject from "../support/pages/settings.pageObject";

const settingsPage = new settingsPageObject;

const user = faker.name.firstName();
const testData = {
  newUsername: user.toLowerCase(),
  newBio: faker.lorem.words(),
  newPassword: faker.name.lastName() + faker.address.city(),
  newEmail: faker.internet.email()
}

describe('Settings page', () => {
let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.editUsername(testData.newUsername);
    settingsPage.sumbitSettings();
    settingsPage.assertNewUsername(testData.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.editBio(testData.newBio);
    settingsPage.sumbitSettings();
    settingsPage.assertNewBio(testData.newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.editEmail(testData.newEmail);
    settingsPage.sumbitSettings();
    settingsPage.logOut();
    settingsPage.assertNewEmail(testData.newUsername, testData.newEmail, user.password);
  });

  it('should provide an ability to update password', () => {
    settingsPage.editEmail(testData.newPassword);
    settingsPage.sumbitSettings();
    settingsPage.logOut();
    settingsPage.assertNewEmail(testData.newUsername, user.email, testData.newPassword);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOut();
    settingsPage.assertLogOut();
  });
});
