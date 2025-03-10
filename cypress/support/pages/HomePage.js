class HomePage {
    visitSetingsPage() {
      cy.visit('/settings');
    }

    visitLoginPage() {
      cy.visit('/user/login');
    }
}
  
export const homePage = new HomePage();