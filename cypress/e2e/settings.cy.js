/// <reference types="cypress" />
/// <reference types="../support" />

import { da, faker } from '@faker-js/faker';

import SignInPageObject
  from '../support/pages/signIn.pageObject';
import HomePageObject
  from '../support/pages/home.pageObject';
import SettingsPageObject
  from '../support/pages/settings.pageObject';
import ProfilePageObject
  from '../support/pages/profile.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;

  let randomNumber = Math.ceil(Math.random(1000) * 1000);
  let userName = faker.name.firstName() + `${randomNumber}`;

  const data = {
    username: userName.toLowerCase(),
    bio: faker.lorem.sentence(),
    email: 'test'+`${randomNumber}`+'@mail.com',
    password: 'Q!w2e3r4t5'
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(data.username);
    settingsPage.clickSubmitBtn();

    homePage.assertHeaderContainUsername(data.username);
    user.username = data.username;
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(data.bio);
    settingsPage.clickSubmitBtn();

    profilePage.assertBio(data.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmail(data.email);
    settingsPage.clickSubmitBtn();

    homePage.visit();

    settingsPage.visit();
    settingsPage.assertUserEmail(data.email);

    user.email = data.email;
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePassword(data.password);
    settingsPage.clickSubmitBtn();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(data.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
    user.password = data.password;
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogOutBtn();

    homePage.asserSignInLink();
    homePage.asserSignUpLink();
  });
});
