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
    settingPage.typeUserName(user.username);
    settingPage.clickUpdateButton();
    settingPage.reloadPage();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingPage.typeBio(user.username);
    settingPage.clickUpdateButton();
    settingPage.visit('/profile/riot');
    profilePage.assertBioContainNewBio(user.username);
  });

  it('should provide an ability to update an email', () => {
    settingPage.typeEmail(user.email);
    settingPage.clickUpdateButton();
    settingPage.clickLogoutButton();
    settingPage.reloadPage();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });

  it('should provide an ability to update password', () => {
    settingPage.typePassword('newPassword123');
    settingPage.clickUpdateButton();
    settingPage.clickLogoutButton();
    settingPage.reloadPage();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword('newPassword123');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('riot');
  });


  it('should provide an ability to log out', () => {
    settingPage.clickLogoutButton();
    homePage.assertHeaderContainH1Text('conduit');
  });
});
