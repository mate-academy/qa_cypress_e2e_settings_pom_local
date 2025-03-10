/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import settingPageObject from '../support/pages/settings.pageObject';
import { url } from 'inspector';

const signInPage = new SignInPageObject();
const settingsPage = new settingPageObject();

describe('Settings page', () => {
  let user;
  
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.clearUsernameField();
    settingsPage.fillUsernameField('qwert');
    settingsPage.clcikOnUpdateBtn();
    settingsPage.checkUpdateUserInfo('qwert');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.clearBioField();
    settingsPage.fillBioFiled('Lorem');
    settingsPage.clcikOnUpdateBtn();
    settingsPage.checkUpdateUserInfo('Lorem');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.clearEmailField();
    settingsPage.fillEmailField('efvwaef@gmail.com');
    settingsPage.clcikOnUpdateBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.fillPasswordField('Qwertyui4331');
    settingsPage.clcikOnUpdateBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('Qwertyui4331');
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
