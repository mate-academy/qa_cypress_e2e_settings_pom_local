/// <reference types="cypress" />
/// <reference types="../support" />
import { settingsPageObject } from "../support/pages/settingsPageObject";
import { profilePage } from "../support/pages/profilePage";
import { homePageObject } from "../support/pages/home.pageObject";
describe('Settings page', () => {
  let user;
  let newUser;
  before(() => {
    cy.task('generateUser').then((generateUser)=>{
      user = generateUser;
      return cy.task('generateUpdateUser');
    }).then((generateUpdateUser)=>{
      newUser = generateUpdateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    settingsPageObject.visit();
    settingsPageObject.fillUsernameField(newUser.usernameChanged);
    settingsPageObject.clickUpdateButton();
    homePageObject.assertHeaderContainUsername(newUser.usernameChanged);
  });

  it('should provide an ability to update bio', () => {
    settingsPageObject.visit();
    settingsPageObject.fillBioField(newUser.bioChanged);
    settingsPageObject.clickUpdateButton();
    profilePage.visit(user.username);
    profilePage.assertProfileContainBio(newUser.bioChanged);
  });

  it('should provide an ability to update an email', () => {
    settingsPageObject.visit();
    settingsPageObject.fillEmailField(newUser.emailChanged);
    settingsPageObject.clickUpdateButton();
    settingsPageObject.visit();
    settingsPageObject.assertTheEmailField(newUser.emailChanged); 
  });

  it('should provide an ability to update password', () => {
    settingsPageObject.visit();
    settingsPageObject.fillPasswordField(newUser.passwordChanged);
    settingsPageObject.clickUpdateButton();
    settingsPageObject.clickLogoutButton();
    cy.loginFlow(user.email, newUser.passwordChanged);
    settingsPageObject.visit();
    homePageObject.assertHeaderContainUsername(user.username); 
  });

  it('should provide an ability to log out', () => {
    settingsPageObject.visit();
    settingsPageObject.clickLogoutButton();
  });
});
