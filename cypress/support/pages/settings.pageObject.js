import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField(){
        return cy.getByDataCy('user-name-settings');
    }

    fillUsernameField(fillUsername){
        this.usernameField.clear().type(fillUsername);
    }

    get bioField(){
        return cy.getByDataCy('user-short-bio');
    }

    typeInBioField(typeInBio){
        this.bioField.clear().type(typeInBio);
    }

    get emailField(){
        return cy.getByDataCy('user-email');
    }

    typeInEmailField(typeEmail){
        this.emailField.clear().type(typeEmail);
    }

    get passwordField(){
        return cy.getByDataCy('user-newpassword');
    }

    typeInPasswordField(typePassword){
        this.passwordField.type(typePassword);
    }

    get updateBtn(){
        return cy.getByDataCy('update-button');
    }

    clickUpdateBtn(clickBtn){
        this.updateBtn.click(clickBtn);
    }

    get logoutBtn(){
        return cy.getByDataCy('logout-btn');
    }

    get userBio(){
        return cy.getByDataCy('user-bio');
    }

    userBioTextExist(containBio){
        this.userBio.should('contain.text', containBio);
    }

    clickOnEditBtn(editBtn){
        return cy.getByDataCy('edit-btn').click(editBtn);
    }

    emailFieldIsUpdated(updateEmail){
        this.emailField.should('contain.value', updateEmail);
    }

    passwordFieldIsUpdated(updatePassw){
        this.passwordField.should('contain.value', updatePassw);
    }

    get logOutBtn(){
        return cy.getByDataCy('logout-btn')
    }

    clickOnLogOutBtn(logout){
        this.logOutBtn.click()
    }

    get navBar(){
        return cy.getByDataCy('nav-bar')
    }

    navbarShouldNotContain(notContain){
        this.navBar.should('not.contain', notContain)
    }

}

export default SettingsPageObject;
