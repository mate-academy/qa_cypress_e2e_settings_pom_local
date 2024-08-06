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
    userInformation.visit();

  });

  it('should provide an ability to update username', () => {
    userInformation.typeUsername(user.username1);
    userInformation.clickOnUpdateSettingsBtn();
    userInformation.visit();
    userInformation.verifyUsername(user.username1);
  });

  it('should provide an ability to update bio', () => {
    userInformation.typeBio(user.bio);
    userInformation.clickOnUpdateSettingsBtn();
    userInformation.visit();
    userInformation.verifyBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    userInformation.typeEmail(user.email1);
    userInformation.clickOnUpdateSettingsBtn();
    userInformation.visit();
    userInformation.verifyBio(user.email1);
    userInformation.clickOnLogoutBtn();
    signInPage.typeEmail('testuser20@gmail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    userInformation.typeNewPassword(user.password1);
    userInformation.clickOnUpdateSettingsBtn();
    userInformation.visit();
    userInformation.clickOnLogoutBtn();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password1);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
});
