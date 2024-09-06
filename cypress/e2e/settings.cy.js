/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

const testData = {
  name: faker.name.firstName(),
  bio: faker.lorem.paragraph(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });


  it('should provide an ability to update username', () => {
    settingsPage.typeName(testData.name);
    settingsPage.verifyUserName(testData.name);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(testData.bio);
    settingsPage.verifyBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(testData.email);
    settingsPage.verifyEmail(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(testData.password);
    settingsPage.verifyPassword(testData.password);
    settingsPage.clickUpdateBtn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    settingsPage.verifySignInLink();
  });
});
