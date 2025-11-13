class ProfilePage {
  visit(username) {
    cy.visit(`/profile/${username}`);
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  verifyFollowBtnText(expectedText) {
    this.followBtn.should('contain', expectedText);
  }
}

export default ProfilePage;
