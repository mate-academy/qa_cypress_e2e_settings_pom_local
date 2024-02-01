import PageObject from './PageObject';

class SignUpPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/register'; // Подставьте актуальный URL страницы регистрации
  }

  typeUsername(username) {
    cy.get('[data-cy=username-input]').type(username);
  }

  typeEmail(email) {
    cy.get('[data-cy=email-input]').type(email);
  }

  typePassword(password) {
    cy.get('[data-cy=password-input]').type(password);
  }

  clickSignUpButton() {
    cy.get('[data-cy=sign-up-btn]').click();
  }

  // Метод для проверки успешной регистрации, например, переход на главную страницу
  assertSuccessfulSignUp() {
    cy.url().should('include', '/'); // Проверьте URL, который подтверждает успешную регистрацию
  }
}

export default SignUpPageObject;
