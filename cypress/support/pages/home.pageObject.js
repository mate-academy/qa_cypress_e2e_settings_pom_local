//HomePageObject
import { ArgumentError } from '../customCommands.js';
import PageObject from '../PageObject.js';

class HomePageObject extends PageObject {
  url = '/#/';
  static marks = { 
    logo: false,
    navBar: false,
    homeLink: true,
    newArticleLink: true,
    settingsLink: false,
    userLink: true,
    signUpLink: false,
    signInLink: false
  };

  clearMarks() {
    HomePageObject.marks = { 
      logo: false,
      navBar: false,
      homeLink: false,
      newArticleLink: false,
      settingsLink: false,
      userLink: false,
      signUpLink: false,
      signInLink: false
    };
  }

  createMarks(logIn = false) { //create object in test because of cy.
    if (!(typeof logIn === 'boolean')) {
      throw new ArgumentError('"logIn" must be Boolean');
    }

    for (let [key, value] of Object.entries(HomePageObject.marks)) {
      const isCreated = value === true;
      const skipDueToLocation =
        ((key === 'signUpLink' || key === 'signInLink') && logIn) ||
        ((key === 'settingsLink' || key === 'newArticleLink') && !logIn);

      if (isCreated) {
        continue; 
      } else if (skipDueToLocation) {
        continue;
      }

      switch(true) {
        case key === 'logo':
          cy.get('nav a').contains('conduit')
            .then((logo) => {
              logo[0].setAttribute('data-cy', 'nav-logo');
              HomePageObject.marks.logo = true;
            });
    
        break;
        case key === 'navBar':
          cy.get('nav')
            .then((bar) => {
              bar[0].setAttribute('data-cy', 'nav-bar');
              HomePageObject.marks.navBar = true;
            });

          break;
        case key === 'homeLink':
          cy.get('nav a').contains('Home')
            .then((link) => {
              link[0].setAttribute('data-cy', 'home-link');
              HomePageObject.marks.homeLink = true;
            });

          break;
        case key === 'newArticleLink':
          cy.get('nav a')
            .contains('New Article')
            .then((link) => {
              link[0].setAttribute('data-cy', 'new-article-link');
              HomePageObject.marks.newArticleLink = true;
            });
          
          break;
        case key === 'settingsLink':
          cy.get('nav a')
            .contains('Settings')
            .then((link) => {
              link[0].setAttribute('data-cy', 'nav-settings-link');
              HomePageObject.marks.settingsLink = true;
            });

          break;
        case key === 'userLink':
          cy.get('nav a [alt]').closest('a')
            .then((link) => {
              link[0].setAttribute('data-cy', 'profile-link');
              HomePageObject.marks.userLink = true;
            });

          break;
        case key === 'signUpLink':
          cy.get('a')
            .contains('Sign up')
            .then((link) => {
              link[0].setAttribute('data-cy', 'nav-signUp-link');
              HomePageObject.marks.signUpLink = true;
            });

          break;
        case key === 'signInLink':
          cy.get('a')
            .contains('Sign in')
            .then((link) => {
              link[0].setAttribute('data-cy', 'nav-signIn-link');
              HomePageObject.marks.signInLink = true;
            });

          break;
      } 
    }
  }

  get navigationBar() {
    return cy.getByDataCy('nav-bar');
  }

  get logo() {
    return cy.getByDataCy('nav-logo');
  }

  get homeLink() {
    return cy.getByDataCy('home-link');
  }

  get newArticleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get settingsLink() {
    return cy.getByDataCy('nav-settings-link');
  }

  get userLink() {
    return cy.getByDataCy('profile-link');
  }

  get signInLink() {
    return cy.getByDataCy('nav-signIn-link');
  }

  get signUpLink() {
    return cy.getByDataCy('nav-signUp-link');
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  clickLogo() {
    this.logo.click();
  }

  clickHomeLink() {
    this.homeLink.click();
  }

  clickNewArticleLink() {
    this.newArticleLink.click();
  }

  clickUserLink() {
    this.userLink.click();
  }

  assertHeaderContainUsername(username) {
    this.userLink
      .should('contain', username);
  }

  clickSignUpLink() {
    this.signUpLink.click();
  }

  clickSignInLink() {
    this.signInLink.click();
  }
} 

export default HomePageObject;
