/* eslint-disable max-len */
/// <reference types="cypress" />
/// <reference types="../support" />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Sign Up page', () => {
	let user;
	let user2;

  beforeEach(() => {
		cy.task('db:clear');

		cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

		cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  it('should register user', () => {
		signUpPage.visit();
		signUpPage.typeUsername(user.username);
		signUpPage.typeEmail(user.email);
		signUpPage.typePassword(user.password);
		signUpPage.clickSignInBtn();

		homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow register with an existed email', () => {
		cy.login(user.email, user.username, user.password);
		settingsPage.visit();
		settingsPage.clickLogoutBtn();

		signUpPage.visit();
		signUpPage.typeUsername(user2.username);
		signUpPage.typeEmail(user.email);
		signUpPage.typePassword(user2.password);
		signUpPage.clickSignInBtn();

		cy.get('li').contains('This email is taken.')
			.should('exist');
  });

  it('should not allow to register for without entered Username', () => {
		signUpPage.visit();
		signUpPage.typeEmail(user.email);
		signUpPage.typePassword(user.password);
		signUpPage.clickSignInBtn();

		cy.get('li')
		.contains('Username must start with a letter, have no spaces, and be 3 - 40 characters.')
		.should('exist');
  });
});
