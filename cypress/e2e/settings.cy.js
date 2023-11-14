/// <reference types="cypress" />
/// <reference types="../support" />
import { settings } from 'cluster';
import faker from 'faker';
import SettingsPageObgect from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { fa } from 'faker/lib/locales';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const testData = {
  email: faker.internet.email().toLowerCase(),
  username: faker.name.firstName().toLowerCase(),
  password: faker.internet.password(),
  bio: faker.lorem.words()
};

const settingsPageObgect = new SettingsPageObgect();
const signInPageObject = new SignInPageObject();
const homePageObject = new HomePageObject();
const profilePageObject = new ProfilePageObject();

describe('Settings page', () => {
  let user;

  before(() => {

});

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    signInPageObject.visit();
    signInPageObject.typeEmail(user.email);
    signInPageObject.typePassword(user.password);
    signInPageObject.clickSignInBtn();
    });
    

  });

  it('should provide an ability to update username', () => {
    settingsPageObgect.visit();
    settingsPageObgect.typeUsername(testData.username);
    settingsPageObgect.clickUpdateSettings();
    homePageObject.assertHeaderContainUsername(testData.username);

  });

  it('should provide an ability to update bio', () => {
    settingsPageObgect.visit();
    settingsPageObgect.typeBioField(testData.bio);
    settingsPageObgect.clickUpdateSettings();
    profilePageObject.assertBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPageObgect.visit();
    settingsPageObgect.typeEmailField(testData.email);
    settingsPageObgect.clickUpdateSettings();
    settingsPageObgect.visit();
    settingsPageObgect.clickLogoutBtn();
    signInPageObject.visit();
    signInPageObject.typeEmail(testData.email);
    signInPageObject.typePassword(user.password);
    signInPageObject.clickSignInBtn();
    homePageObject.assertHeaderContainUsername(user.username);

  });

  it('should provide an ability to update password', () => {
    settingsPageObgect.visit();
    settingsPageObgect.typePasswordField(testData.password);
    settingsPageObgect.clickUpdateSettings();
    settingsPageObgect.visit();
    settingsPageObgect.clickLogoutBtn();
    signInPageObject.visit();
    signInPageObject.typeEmail(user.email);
    signInPageObject.typePassword(testData.password);
    signInPageObject.clickSignInBtn();
    homePageObject.assertHeaderContainUsername(user.username);


  });

  it('should provide an ability to log out', () => {
    settingsPageObgect.visit();
    settingsPageObgect.clickLogoutBtn();
    homePageObject.assertHeaderNotContainUsername();

  });
});
