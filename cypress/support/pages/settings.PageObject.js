import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  // visitPage() {
  //   cy.visit(this.url);
  // }

  getByDataAttr (dataAttr) {
    return cy.get(`[data-cy="${dataAttr}"]`);
  }

  fillField(dataAttr, newData) {
    this.getByDataAttr(dataAttr)
    .clear()
    .type(newData);
  }

  clickOnUpdateSettingBtn() {
    this.getByDataAttr('update-btn').click();
  }

  confirmUpdatedLink(username) {
    cy.url().should('contain', `/profile/${username}`);
  }

  assertUpdatedInfo(updatedInfo) {
    cy.get('.profile-page .user-info .container')
      .should('contain', updatedInfo);
  }

  clickOnLogoutBtn () {
    this.getByDataAttr('logout-btn').click();
  }
}
export default SettingsPageObject;