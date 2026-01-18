import SettingsPage from '../support/pages/settings.pageObject';

const settingPage = new SettingsPage();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      cy.login(
        generateUser.email,
        generateUser.username,
        generateUser.password
      );
      user = generateUser;
      cy.then(() => {
        cy.visit('/settings');
      });
    });
  });

  it('should provide an ability to update username', () => {
    cy.generateUsername().then((newUsername) => {
      settingPage.changeUsername(newUsername);
      settingPage.clickOnUpdateSettingsBtn();
      settingPage.checkUrl(newUsername);
      // Verify that username was actually updated in the form
      cy.visit('/settings');
      settingPage.getUsername().should('equal', newUsername);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.generateBio().then((newBio) => {
      settingPage.changeBio(newBio);
      settingPage.clickOnUpdateSettingsBtn();
      settingPage.checkUrl(user.username);
      // Verify that bio was actually updated by checking the form
      cy.visit('/settings');
      settingPage.getBio().should('equal', newBio);
    });
  });

  it('should provide an ability to update an email', () => {
    cy.generateEmail().then((newEmail) => {
      settingPage.changeEmail(newEmail);
      settingPage.clickOnUpdateSettingsBtn();
      settingPage.checkUrl(user.username);
      // Verify that email was actually updated in the form
      cy.visit('/settings');
      settingPage.getEmail().should('equal', newEmail);
    });
  });

  it('should provide an ability to update password', () => {
    cy.generatePassword().then((newPassword) => {
      settingPage.changePassword(newPassword);
      settingPage.clickOnUpdateSettingsBtn();
      settingPage.checkUrl(user.username);
      // Verify password change by logging out and logging back in with new password
      cy.visit('/settings');
      settingPage.clickLogoutBtn();
      cy.url().should('include', '/');
      cy.login(user.email, user.username, newPassword);
      cy.url().should('include', '/');
    });
  });

  it('should provide an ability to log out', () => {
    settingPage.clickLogoutBtn();
    cy.url().should('include', '/');
  });
});