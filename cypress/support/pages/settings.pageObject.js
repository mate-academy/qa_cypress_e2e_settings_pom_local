import PageObject from '../PageObject';

class SettingsPageObject extends PageObject{
    url = '/settings';

    get updateSettingsButton() {
        return cy.get('[data-cy="update-settings-btn"]');
    }

    changeItem(dataCY, value) {
        cy.get(`[data-cy="${dataCY}"]`).as('inputField');
        cy.get('@inputField').clear();
        cy.get('@inputField').type(value);
    }

    checkInput(dataCY, value) {
        cy.get(`[data-cy="${dataCY}"]`).as('newInputField');
        cy.get('@newInputField').should('have.value', value);
    }

    clickUpdateSettingsBtn() {
        this.updateSettingsButton.click();
    }
}

export default SettingsPageObject;