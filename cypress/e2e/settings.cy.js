/// <reference types='cypress'/>
/// <reference types='../support'/>
const faker = require('faker');
import SettingsPageObject
  from '../support/pages/settings.pageObject';

const settings = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  const testData = {
    username: faker.lorem.words(1),
    bio: faker.lorem.words(4),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password);
    });

    settings.visit();
  });

  it('should provide an ability to update username', () => {
    settings.usernameType(testData.username);
    settings.setingsBtn.click();

    settings.editProfBtn.click();

    settings.assertChanges(
      settings.usernameField, testData.username
    );
  });

  it('should provide an ability to update bio', () => {
    settings.bioType(testData.bio);
    settings.setingsBtn.click();

    settings.editProfBtn.click();
    settings.assertChanges(
      settings.bioField, testData.bio
    );
  });

  it('should provide an ability to update an email', () => {
    settings.emailType(testData.email);
    settings.setingsBtn.click();

    settings.editProfBtn.click();
    settings.assertChanges(
      settings.emailField, (testData.email).toLowerCase()
    );
  });

  it('should provide an ability to update password', () => {
    settings.passwordType(testData.password);
    settings.setingsBtn.click();
    
    cy.login(user.email, testData.password);
  });

  it('should provide an ability to log out', () => {
    settings.logOutBtn.click();

    settings.assertConduitBanner();
  });
});
