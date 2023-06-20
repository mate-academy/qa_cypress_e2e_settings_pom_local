import PageObject from '../PageObject';

class registratePageObject extends PageObject {
    url = '/user/register';

regNewUser (username, email, password) {
    cy.get(':nth-child(1) > .form-control').type(username)
    cy.get('[data-cy="email-sign-in"]').type(email)
    cy.get('[data-cy="password-sign-in"]').type(password)
    cy.get('[data-cy="sign-in-btn"]').click()
}
}
export default registratePageObject;