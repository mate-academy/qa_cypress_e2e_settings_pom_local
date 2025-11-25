import PageObject from '../PageObject';

class LoginPageObject extends PageObject{
    url = '/login';

    get SignInBtn() {
        return cy.get('[data-cy="sign-in-btn"]');
    }
    typeInInputField(dataCY, value) {
        cy.get(`[data-cy="${dataCY}"]`).as('inputField');
        cy.get('@inputField').clear();
        cy.get('@inputField').type(value);
    }

    clickSignInBtn() {
        this.SignInBtn.click();
    }
}

export default LoginPageObject;