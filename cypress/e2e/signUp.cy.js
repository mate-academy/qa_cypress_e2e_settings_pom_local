/* eslint-disable semi */
/// <reference types="cypress" />
/// <reference types="../support" />
import SignUpPageObject from '../support/pages/signUp.pageObject'
import homePageObject from '../support/pages/home.pageObject'

const signUpPage = new SignUpPageObject()
const homePage = new homePageObject()

describe('Sign Up page', () => {
  let user

  before(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    })
  })

  it('should provide an ability to sign up user', () => {
    signUpPage.visit()
    signUpPage.typeUserName(user.username)
    signUpPage.typeEmail(user.email)
    signUpPage.typePassword(user.password)
    signUpPage.signInBtn.click()
    homePage.assertHeaderContainUsername(user.username)
  })
})
