import PageObject from "../PageObject";

class ProfilePageObject extends PageObject {
  url = '/profile'

  get userInfoContainer() {
    return cy.getByDataCy('user-information-container');
  }

  get editProfileBtn() {
    return cy.contains('.btn-sm', 'Edit Profile Settings');
  }

  containNewUsername(newUsername) {
    this.userInfoContainer.should('contain', newUsername);
  }

  containBio(bio) {
    this.userInfoContainer.should('contain', bio);
  }

  clickEditProfileBtn() {
    this.editProfileBtn.click();
  }

}

export default ProfilePageObject