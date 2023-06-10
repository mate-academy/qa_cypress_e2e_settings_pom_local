import PageObject from "../PageObject";

class settingsPageObject extends PageObject {
    url = '/settings';

    loggedUser() {
      cy.login();
    }

    updateUsername() {
      cy.getByDataCy('settings-username')
        .clear()
        .type(username);
    }

    updateBio(bio) {
      cy.getByDataCy('settings-bio')
      .type(bio);
    }

    updateEmail(email) {
      cy.getByDataCy('settings-email')
        .clear()
        .type(email);
    }
    
    updatePassword(password) {
      cy.getByDataCy('settings-password')
        .type(password);
    }
    
    submitButton() {
      cy.getByDataCy('settings-submit')
        .click();
    }
    
    assertBio(bio) {
      cy.getByDataCy('settings-bio')
        .should('contain', bio);
    }
    
    logOut() {
      cy.getByDataCy('/settings')
        .click();
      cy.get('.btn-outline-danger')
        .click();
    };
    
    assertLogOut() {
      cy.getByDataCy('/user/login')
        .should('contain', 'Sign in');
      cy.getByDataCy('/user/register')
        .should('contain', 'Sign up');
    } 
    
    submitSignInForm(email, password) {
      cy.getByDataCy('/user/login')
        .click();
      cy.getByDataCy('email-sign-in')
        .type(email);
      cy.getByDataCy('password-sign-in')
        .type(password);
      cy.getByDataCy('sign-in-btn')
        .click();
    };
}

export default settingsPageObject;
