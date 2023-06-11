/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require("faker");
import settingsPageObject from "../support/pages/settings.pageObject";
import profilePageObject from "../support/pages/profile.pageObgect";
import homePageObject from "../support/pages/home.pageObject";

const settingsPage = new settingsPageObject();
const profilePage = new profilePageObject();
const homePage = new homePageObject();
let randomNumber = Math.ceil(Math.random(1000) * 1000);
let userName = faker.name.firstName() + `${randomNumber}`;
const newSettings = {
  username: userName.toLowerCase(),
  bio: faker.lorem.words(),
  email: userName.toLowerCase() +'@qa.team',
  password: 'Newpassword123'
};
let user;

describe('Settings page', () => {
  before(() => {
    cy.task('generateUser')
      .then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeNewUsername(newSettings.username);
    settingsPage.clickUpdateBtn();
    profilePage.assertNewUsername(newSettings.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeNewBio(newSettings.bio);
    settingsPage.clickUpdateBtn();
    profilePage.assertNewBio(newSettings.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeNewEmail(newSettings.email);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.assertNewEmail(newSettings.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typeNewPassword(newSettings.password);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.clickLogOut();
    cy.login(user.email, newSettings.password);
    homePage.visit();
    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogOut();
    homePage.assertLogOut();
  });
});
