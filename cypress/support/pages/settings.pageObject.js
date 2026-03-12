//SettingPageObject
import PageObject from '../PageObject.js';
import HomeObject from './home.pageObject.js';

class SettingPageObject extends PageObject {
  url = '/user/settings';
  static marks = {
    username: false,
    password: false,
    email: false,
    bioTextArea: false,
    buttonUpdateSetting: false,
    logOutButton: false
  };

  clearMarks() {
    SettingPageObject.marks = {
      username: false,
      password: false,
      email: false,
      bioTextArea: false,
      buttonUpdateSetting: false,
      logOutButton: false
    };
  }

  createMarks() {
    for (let [key, value] of Object.entries(SettingPageObject.marks)) {
      const doesItSkip = value === true;

      if (doesItSkip) {
        continue;
      }

      switch(key) {
        case 'username':
          cy.get('form [placeholder^="Username"]')
            .then((field) => {
              field[0].setAttribute('data-cy', 'username-field-settings');
              SettingPageObject.marks.username = true;
            });
    
        break;
        case 'password':
          cy.get('form [placeholder^="New Password"]')
            .then((field) => {
              field[0].setAttribute('data-cy', 'password-field-settings');
              SettingPageObject.marks.password = true;
            });

          break;
        case 'email':
          cy.get('form [placeholder^="Email"]')
            .then((field) => {
              field[0].setAttribute('data-cy', 'email-field-settings');
              SettingPageObject.marks.email = true;
            });          

          break;
        case 'bioTextArea':
          cy.get('form [placeholder^="Short bio about you"]')
            .then((textArea) => {
              textArea[0].setAttribute('data-cy', 'bio-textArea-settings');
              SettingPageObject.marks.bioTextArea = true;
            });
          
          break;
        case 'buttonUpdateSetting':
          cy.get('form button').contains('Update Settings')
            .then((button) => {
              button[0].setAttribute('data-cy', 'update-button-settings');
              SettingPageObject.marks.buttonUpdateSetting = true;
            });          

          break;
        case 'logOutButton':
          cy.get('button').contains('Or click here to logout.')
            .then((button) => {
              button[0].setAttribute('data-cy', 'logOut-button-settings');
              SettingPageObject.marks.logOutButton = true;
            });           

          break;
      }
    }
  }  

  get usernameField() {
    return cy.getByDataCy('username-field-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-field-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-field-settings');
  }

  get bioTextArea() {
    return cy.getByDataCy('bio-textArea-settings');
  }

  get buttonUpdateSetting() {
    return cy.getByDataCy('update-button-settings');
  }

  get logOutButton() {
    return cy.getByDataCy('logOut-button-settings');
  }

  clickOnUsernameField() {
    this.usernameField.click();
  }

  clickOnPasswordField() {
    this.passwordField.click();
  }

  clickOnEmailField() {
    this.emailField.click();
  }

  clickOnBio() {
    this.bioTextArea.click();
  }

  clickOnUpdateButton() {
    this.buttonUpdateSetting.click();
  }

  clickOnLogOutButton() {
    this.logOutButton.click();
  }

}

// const homeObjPrototype = HomeObject.prototype;

// SettingPageObject.prototype.homeMixIn = {
//   'getLogo': homeObjPrototype.clickLogo
//     .bind(homeObjPrototype),
//   'getHomeLink': homeObjPrototype.clickHomeLink
//     .bind(homeObjPrototype),
//   'getNewArticleLink': homeObjPrototype.clickNewArticleLink
//     .bind(homeObjPrototype),
//   'getSettingsLink': homeObjPrototype.clickSettingsLink
//     .bind(homeObjPrototype),
//   'getUserLink': homeObjPrototype.clickUserLink
//     .bind(homeObjPrototype),
//   'getCreateMarks': homeObjPrototype.createMarks
//     .bind(homeObjPrototype)
// };

export default SettingPageObject;