import SettingsPageObject from '../support/pages/settings.pageObject';

const SettingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user.email, user.username, user.password);
    });
    SettingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = SettingsPage.updateUserName();
    SettingsPage.clickUpdateButton();
    SettingsPage.ensureProfileUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = SettingsPage.updateBio();
    SettingsPage.clickUpdateButton();
    SettingsPage.ensureProfileBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    SettingsPage.updateEmail();
    SettingsPage.clickUpdateButton();
  });

  it('should provide an ability to update password', () => {
    SettingsPage.updatePassword();
    SettingsPage.clickUpdateButton();
  });
});
