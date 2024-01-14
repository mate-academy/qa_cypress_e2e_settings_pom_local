import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField(){
        return cy.getByDataCy('user-name-settings');
    }

    get bioField(){
        return cy.getByDataCy('user-short-bio');
    }

    get emailField(){
        return cy.getByDataCy('user-email');
    }

    get passwordField(){
        return cy.getByDataCy('user-newpassword');
    }

    get updateBtn(){
        return cy.getByDataCy('update-button');
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

    emailFieldIsUpdate(updateEmail){
        this.emailField.should('contain.value', updateEmail);
    }

    passwordFieldIsUpdate(updatePassw){
        this.passwordField.should('contain.value', updatePassw);
    }

    get logOutBtn(){
        return cy.getByDataCy('logout-btn')
    }

    clickOnLogOutbtn(logout){
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
