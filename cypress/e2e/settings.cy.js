/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
const signInPage = new SignInPageObject();
import Settings from '../support/pages/settings.pageObject';
import faker from 'faker';
const settings = new Settings();



describe('Settings page', () => {
  let user;
  const userName = faker.name.firstName().toLowerCase();
  const userData = {
    newUserName: userName,
    bio: faker.lorem.words(5).toLowerCase(),
    newEmail: `${userName}@gmail.com`, 
    newPassword: faker.internet.password(),
   };

   beforeEach(() => {
    cy.task('db:clear');
     cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settings.visit();
    });
    

  it('should provide an ability to update username', () => {
    settings.typeUserName(userData.newUserName);
    settings.clickOnUpdateBtn();
    settings.assertUserName(userData.newUserName);
    settings.linkHaveUserNAme(userData.newUserName);
    

  });

  it('should provide an ability to update bio', () => {
    settings.typeBio(userData.bio);
    settings.clickOnUpdateBtn();
    settings.assertBio(userData.bio);

  });

  it('should provide an ability to update an email', () => {
    settings.typeEmail(userData.newEmail);
    settings.clickOnUpdateBtn();
    cy.reload();
    settings.assertEmail(userData.newEmail);

  });

  it('should provide an ability to update password', () => {
    settings.typePassword(userData.newPassword);
    settings.clickOnUpdateBtn();
    cy.reload();
    cy.clearAllCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(userData.newPassword);
    signInPage.clickSignInBtn();
    });

  it('should provide an ability to log out', () => {
    settings.clickOnLogoutBtn();
    settings.navBar(user.username);
  });
});
