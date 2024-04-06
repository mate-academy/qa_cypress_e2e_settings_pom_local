/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import homePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
	let user;

  beforeEach(() => {
		cy.task('db:clear');

		cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
		cy.login(user.email, user.username, user.password);
		settingsPage.visit();

		settingsPage.typeUsername('_new');
		settingsPage.clickUpdateBtn();
		homePage.assertHeaderContainUsername(`${user.username}_new`);
  });

  it('should provide an ability to update bio', () => {
		cy.login(user.email, user.username, user.password);
		settingsPage.visit();

		settingsPage.typeBio('_new');
		settingsPage.clickUpdateBtn();
		cy.get('.user-info').contains('_new');
  });

  it('should provide an ability to update an email', () => {
		cy.login(user.email, user.username, user.password);
		settingsPage.visit();

		settingsPage.typeEmail('.ua');
		settingsPage.clickUpdateBtn();
		cy.wait(500);
		settingsPage.visit();
		settingsPage.checkEmail(`${user.email}.ua`);
  });

  it('should provide an ability to update password', () => {
		cy.login(user.email, user.username, user.password);
		settingsPage.visit();

		settingsPage.typePassword('123');
		settingsPage.clickUpdateBtn();
		cy.url().should('eq', `http://localhost:3000/profile/${user.username}`);
  });

  it('should provide an ability to log out', () => {
		cy.login(user.email, user.username, user.password);
		settingsPage.visit();
		settingsPage.clickLogoutBtn();
		cy.url().should('eq', 'http://localhost:3000/');
  });
});
