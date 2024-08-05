/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserInformationPageObject 
  from '../support/pages/userInformation.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const userInformation = new UserInformationPageObject();
const homePage = new HomePageObject();
describe('Settings page', () => {
  let user;
  before(() => {
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
    homePage.clickOnSettings();

  });

  it('should provide an ability to update username', () => {
    userInformation.usernameField.clear();
    userInformation.typeUsername(user.username1);
    userInformation.clickOnUpdateSettingsBtn();
    homePage.clickOnSettings();
    userInformation.usernameField.should('have.value', user.username1);
  });

  it('should provide an ability to update bio', () => {
    userInformation.typeBio(user.bio);
    userInformation.clickOnUpdateSettingsBtn();
    homePage.clickOnSettings();
    userInformation.bioField.should('have.value', user.bio);
  });

  it('should provide an ability to update an email', () => {
    userInformation.emailField.clear();
    userInformation.typeEmail(user.email1);
    userInformation.clickOnUpdateSettingsBtn();
    homePage.clickOnSettings();
    userInformation.emailField.should('have.value', user.email1);
  });

  it('should provide an ability to update password', () => {
    userInformation.typeNewPassword(user.password1);
    userInformation.clickOnUpdateSettingsBtn();
  });
});
