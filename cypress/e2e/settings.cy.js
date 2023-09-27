import homePageObject from '../support/pages/home.pageObject';
import profilePageObject from '../support/pages/profile.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';

function generateRandomUser() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const newUser = {
    email: `test${randomNumber}@mail.com`,
    username: `user${randomNumber}`,
    password: 'Qwert12345!',
  };
  return newUser;
}

const settingsPage = new settingsPageObject();
const profilePage = new profilePageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    const user = generateRandomUser();
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.editUsername(user.newUsername);
    settingsPage.submitSettings();
    settingsPage.assertUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    const user = generateRandomUser();
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    const newBio = 'New test bio';
    settingsPage.editBio(user.bio);
    settingsPage.submitSettings();
    settingsPage.assertBio(user.bio);

  });

  it('should provide an ability to update an email', () => {
    const user = generateRandomUser();
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    const newEmail = 'newemail@test.com';
    settingsPage.editEmail(user.newEmail);
    settingsPage.submitSettings();
    settingsPage.logOut();
    settingsPage.assertEmail(user.username, user.newEmail, user.password);

  });

  it('should provide an ability to update password', () => {
    const user = generateRandomUser();
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    const newPassword = 'newPassword123!';
    settingsPage.editPassword(user.newPassword);
    settingsPage.submitSettings();
    settingsPage.logOut();
    settingsPage.assertPassword(user.username, user.email, user.newPassword);

  });

  it('should provide an ability to log out',
   () => {    const user = generateRandomUser();
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.logOut();
    settingsPage.assertLogOut();
});
});
