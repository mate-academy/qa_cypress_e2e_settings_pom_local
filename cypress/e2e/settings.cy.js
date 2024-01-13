/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require('faker');
import { it } from 'mocha';
import SettingsPageObject from '../support/pages/settings.pageObject';
describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();
  let user;

  const newUserName = faker.name.firstName().toLowerCase();
  const newUserBio = faker.random.word().toLowerCase();
  const newUserEmail = `${newUserName}`+'@mail.com';
  const newUserPassword = 'test1234';

  before(() => {
    cy.task('db:clear');

  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email,user.username,user.password); 
      cy.login(user.email,user.username,user.password);
    });

    settingsPage.visit();

  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUserName);
    settingsPage.clickUpdateBtn();
    cy.reload();
    // settingsPage.isUpdated(newUserName); 
    settingsPage.typeUsername(newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUserBio);
    settingsPage.clickUpdateBtn();
    cy.reload();
    settingsPage.isUpdatedBio(newUserBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUserEmail);
    settingsPage.clickUpdateBtn();
    cy.reload();
    settingsPage.isUpdEmail(newUserEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUserPassword);
    settingsPage.clickUpdateBtn();
    cy.clearAllCookies();
    cy.login(user.email,user.username,newUserPassword);
    settingsPage.visit();
    settingsPage.isUpdPassword(user.email);
  });

});
