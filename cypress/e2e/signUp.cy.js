/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject'
import { SignUpPageObject } from '../support/pages/signUp.pageObject'

const signUpPage = new SignUpPageObject()
const homePage = new HomePageObject()

describe('Sign Up page', () => {
  let user

  beforeEach(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser
    })
  })

  it('should register new user', () => {
    signUpPage.visit()

    signUpPage.typeUserName(user.username)
    signUpPage.typeEmail(user.email)
    signUpPage.typePassword(user.password)
    signUpPage.clickSignUpBtn()

    homePage.assertHeaderContainUsername(user.username)
  })
})
