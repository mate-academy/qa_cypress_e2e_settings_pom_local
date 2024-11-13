import SettingPageObject from '../support/pages/setting.page.Object';
import HomePageObject from '../support/pages/home.page.Object';
import ProfilePageObject from '../support/pages/profile.page.Object';
import SignInPageObject from '../support/pages/signIn.page.Object';

const settingPage = new SettingPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Setting page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.login();
    cy.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    cy.get(':nth-child(2) > .form-control').type(user.username);
    cy.get('form > :nth-child(1) > .btn').click();
    cy.reload();
    homePage.assertHeaderContainUsername('riot' + user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.get(':nth-child(3) > .form-control').type(user.username);
    cy.get('form > :nth-child(1) > .btn').click();
    cy.visit('/profile/riot');
    cy.get('.col-xs-12 > p').should('contain.text', user.username);
  });

  it('should provide an ability to update an email', () => {
    cy.get(':nth-child(4) > .form-control').clear();
    cy.get(':nth-child(4) > .form-control').type(user.email);
    cy.get('form > :nth-child(1) > .btn').click();
    cy.get('.btn-outline-danger').click();
    cy.reload();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to update password', () => {
    cy.get(':nth-child(5) > .form-control').type('newPassword123');
    cy.get('form > :nth-child(1) > .btn').click();
    cy.get('.btn-outline-danger').click();
    cy.reload();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('newPassword123');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });


  it('should provide an ability to log out', () => {
    cy.get('.btn-outline-danger').click();
    cy.get('h1').should('contain.text', 'conduit');
  });
});
