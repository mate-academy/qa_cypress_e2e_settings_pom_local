//SignUpPageObject
import PageObject from '../PageObject.js';
import { ArgumentError } from '../customCommands.js';

class SignUpPageObject extends PageObject {
  url = '/user/register';
  static marks = {
    usernameMark: false,
    emailMark: true, //exist in html --->
    passwordMark: true,
    submitButtonMark: true // <---
  };

  clearMarks() {
    SignUpPageObject.marks = {
      usernameMark: false,
      emailMark: false,
      passwordMark: false,
      submitButtonMark: false
    };
  }

  createMarks() {
    for (let [key, value] of Object.entries(SignUpPageObject.marks)) {
      const doesItSkip = value === true;

      if (doesItSkip) {
        continue;
      }

      switch(key) {
        case 'usernameMark':
          cy.get('form input[placeholder^="Username"]')
            .then((field) => {
              field[0].setAttribute('data-cy', 'username-sign-up');
              SignUpPageObject.marks.usernameMark = true;
            });
    
        break;
        case 'emailMark':
          cy.get('form input[placeholder^="Email"]')
            .then((field) => {
              field[0].setAttribute('data-cy', 'email-sign-up');
              SignUpPageObject.marks.emailMark = true;
            });

          break;
        case 'passwordMark':
          cy.get('form input[placeholder^="Password"]')
            .then((field) => {
              field[0].setAttribute('data-cy', 'password-sign-up');
              SignUpPageObject.marks.passwordMark = true;
            });

          break;
        case 'submitButtonMark':
          cy.get('form button')
            .contains('Sign up')
            .then((button) => {
              button[0].setAttribute('data-cy', 'sign-up-btn');
              SignUpPageObject.marks.submitButtonMark = true;
            });
          
          break;
      }
    }
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpButton() {
    return cy.getByDataCy('sign-up-btn');
  }

  fillUsername(username) {
    this.usernameField
      .click()
      .type(username);
  }

  fillEmail(email) {
    this.emailField
      .click()
      .type(email);
  }

  fillPassword(password) {
    this.passwordField
      .click()
      .type(password);
  }

  clickOnSignUpButton() {
    this.signUpButton
      .click();
  }

  /**
   * 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   */
  registerViaAPI(
    username, email, password, useDefaultInternalValidation = true) {
    if (arguments.length < 3) {
      throw new ArgumentError(`Method "registerViaAPI" requires at least 3 argument`);
    } else if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof useDefaultInternalValidation !== 'boolean'
    ) {
      throw new ArgumentError('Method "registerViaAPI" requires only' +
        'String arguments (excluding: the "useDefaultInternalValidation" arg ' +
        ', which must be Boolean');
    }

    const isValidUsername = /^\p{Letter}{3,40}$/ug.test(username);
    const isValidEmail = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    const isValidPassword = 
      /\p{Lu}+/u.test(password) &&
      /\d+/.test(password) &&
      /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/.test(password) &&
      password.length > 3 &&
      password.length < 41;

    switch(true) {
      case !isValidUsername && useDefaultInternalValidation:
        throw new ArgumentError('"username" must have 3-40 letters');
      case !isValidEmail && useDefaultInternalValidation:
        throw new ArgumentError('"email" has probably incorrect structure');
      case !isValidPassword && useDefaultInternalValidation:
        throw new ArgumentError('"password" must consist of at least; ' +
          '1 uppercase, 1 digit, 1 special character and must have from ' +
          '3 to 40 characters'
        );
    }

    cy.register(email, username, password);
  }

  /**
   * 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   */
  registerViaGUI(
    username, email, password, useDefaultInternalValidation = true) {
    if (arguments.length < 3) {
      throw new ArgumentError(`Method "registerViaGUI" requires at least 3 arguments`);
    } else if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof useDefaultInternalValidation !== 'boolean'
    ) {
      throw new ArgumentError('Method "registerViaGUI" requires only ' +
        'String arguments (excluding: the "useDefaultInternalValidation" arg ' +
        ', which must be Boolean');
    }

    const isValidUsername = /^\p{Letter}{3,40}$/ug.test(username);
    const isValidEmail = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    const isValidPassword = 
      /\p{Lu}+/u.test(password) &&
      /\d+/.test(password) &&
      /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/.test(password) &&
      password.length > 3 &&
      password.length < 41;

    switch(true) {
      case !isValidUsername && useDefaultInternalValidation:
        throw new ArgumentError('"username" must have 3-40 letters');
      case !isValidEmail && useDefaultInternalValidation:
        throw new ArgumentError('"email" has probably incorrect structure');
      case !isValidPassword && useDefaultInternalValidation:
        throw new ArgumentError('"password" must consist of at least; ' +
          '1 uppercase, 1 digit, 1 special character and must have from ' +
          '3 to 40 characters'
        );
    }
    this.fillUsername(username);
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickOnSignUpButton();
  }
}

export default SignUpPageObject;