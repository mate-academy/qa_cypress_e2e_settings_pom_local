/// <reference types="cypress" />
/// <reference types="../support" />
import SetttingsObject from '../support/pages/settings.pageObject';

const settingPageObject = new SetttingsObject();
const { faker } = require('@faker-js/faker');
describe('Settings page', () => {
  const updateBio = faker.person.bio();
  const updateName = faker.person.firstName();
  const updateEmail = faker.internet.email();
  const updatePssword = faker.internet.password();


  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = new Object(generateUser);
      // cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.username, user.password);

    });
    settingPageObject.visit();
  });

  it('should provide an ability to update username', () => {
    settingPageObject.changeTypeUser(updateName);
    settingPageObject.getButtonUpdate();

  });

  it('should provide an ability to update bio', () => {
    settingPageObject.changeTypeBio(updateBio);
    settingPageObject.getButtonUpdate();
  });

  it('should provide an ability to update an email', () => {
    settingPageObject.changeTypeEmail(updateEmail);
    settingPageObject.getButtonUpdate();
  });

  it('should provide an ability to update password', () => {
    settingPageObject.changeTypePassword(updatePssword);
    settingPageObject.getButtonUpdate();
  });

  it('should provide an ability to log out', () => {
    settingPageObject.getButtonLogout();
  });
});
