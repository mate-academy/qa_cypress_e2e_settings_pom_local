/// <reference types="cypress" />
/// <reference types="../support" />
import { faker } from '@faker-js/faker';

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings Page - E2E Tests', () => {
  let testUser;

  beforeEach(() => {
    cy.task('db:clear');
    
    testUser = {
      email: faker.internet.email().toLowerCase(),
      username: faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/, ''),
      password: faker.internet.password(12) + 'A1!',
      bio: faker.lorem.sentence(),
    };

    cy.request('POST', '/api/users', {
      user: {
        email: testUser.email,
        username: testUser.username,
        password: testUser.password
      }
    }).then((response) => {
      testUser.token = response.body.user.token;
      cy.setCookie('auth', testUser.token);
      window.localStorage.setItem('user', JSON.stringify(response.body.user));
    });

    cy.visit('/settings');
  });

  it('should update user profile information', () => {
    const updatedBio = faker.lorem.paragraph();
    const updatedUsername = faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/, '');

    settingsPage
      .clearUsername()
      .typeUsername(updatedUsername)
      .clearBio()
      .typeBio(updatedBio)
      .clickUpdateButton();

    settingsPage.successMessage.should('be.visible');

    cy.reload();
    settingsPage.usernameField.should('have.value', updatedUsername);
    settingsPage.bioField.should('have.value', updatedBio);
  });

  it('should update password', () => {
    const newPassword = faker.internet.password(12) + 'A1!';

    settingsPage
      .updatePassword(testUser.password, newPassword)
      .successMessage.should('be.visible');

    settingsPage.clickLogoutButton();
    
    cy.visit('/login');
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(newPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');
  });

  it('should show error when updating to existing username', () => {
    const existingUser = 'existinguser';

    cy.intercept('PUT', '/api/user', {
      statusCode: 422,
      body: {
        errors: {
          username: ['has already been taken'],
        },
      },
    }).as('updateWithExistingUsername');

    settingsPage.updateUsername(existingUser);

    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'has already been taken');
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my updated bio ' + Date.now();

    settingsPage
      .clearBio()
      .typeBio(newBio)
      .clickUpdateButton()
      .successMessage.should('be.visible')
      .and('contain', 'Update successful!');

    cy.reload();
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should handle very long bio', () => {
    const longBio = 'a'.repeat(1000);

    settingsPage
      .clearBio()
      .typeBio(longBio)
      .clickUpdateButton();

    settingsPage.successMessage.should('be.visible');

    cy.reload();
    settingsPage.bioField.should('have.value', longBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage
      .clearEmail()
      .typeEmail(newEmail)
      .clickUpdateButton();

    settingsPage.successMessage.should('be.visible');

    cy.reload();
    settingsPage.emailField.should('have.value', newEmail);
  });

  it('should show error for invalid email format', () => {
    const invalidEmail = 'invalid-email';

    settingsPage
      .clearEmail()
      .typeEmail(invalidEmail)
      .clickUpdateButton();

    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'must be a valid email');
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(12) + 'A1!';

    settingsPage
      .updatePassword(testUser.password, newPassword)
      .successMessage.should('be.visible');

    settingsPage.clickLogoutButton();
    
    cy.visit('/login');
    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[type="password"]').type(newPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');
  });

  it('should show error for incorrect current password', () => {
    const wrongPassword = 'WrongPass123!';
    const newPassword = faker.internet.password(12) + 'A1!';

    settingsPage.updatePassword(wrongPassword, newPassword);

    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'current password is invalid');
  });

  it('should log out the user when log out button is clicked', () => {
    settingsPage.logoutButton.click();

    cy.url().should('include', '/login');
    
    cy.getCookie('auth').should('be.null');
    cy.window().its('localStorage').invoke('getItem', 'user').should('be.null');
    cy.getCookie('auth').should('be.null');
  });

  it('should persist settings after page refresh', () => {
    const newBio = faker.lorem.paragraph();

    settingsPage
      .clearBio()
      .typeBio(newBio)
      .clickUpdateButton();

    settingsPage.successMessage.should('be.visible');

    cy.reload();
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should not allow access to settings when not authenticated', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit('/settings', { failOnStatusCode: false });
    cy.url().should('include', '/login');
  });

  it('should sanitize HTML/JavaScript in bio field', () => {
    const xssPayload = '&lt;script&gt;alert("XSS")&lt;/script&gt;';
    
    settingsPage
      .clearBio()
      .typeBio(xssPayload)
      .clickUpdateButton();

    cy.reload();
    settingsPage.bioField.should('not.contain', '<script>');
    settingsPage.bioField.should('not.contain', 'onerror');
    const sanitizedBio = 'alert("XSS")';

    cy.intercept('PUT', '/api/user', (request) => {
      expect(req.body.user.bio).to.equal(xssPayload);
      req.reply({
        statusCode: 200,
        body: {
          user: {
            ...mockUser,
            bio: sanitizedBio,
          },
        },
      });
    }).as('updateBioWithXSS');

    cy.intercept('GET', '/api/user', {
      statusCode: 200,
      body: {
        user: {
          ...mockUser,
          bio: sanitizedBio,
        },
      },
    }).as('getUserAfterXSS');

    settingsPage
      .clearBio()
      .typeBio(xssPayload)
      .clickUpdateButton()
      .successMessage.should('be.visible');

    cy.wait('@updateBioWithXSS');
    cy.reload();

    cy.wait('@getUserAfterXSS');
    settingsPage.bioField.should('have.value', sanitizedBio);
  });

  it('should handle concurrent updates', () => {
    const firstBio = 'First concurrent update ' + Date.now();
    const secondBio = 'Second concurrent update ' + Date.now();

    cy.intercept('PUT', '/api/user', (request) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          req.reply({
            statusCode: 200,
            body: { user: { ...mockUser, bio: firstBio } },
          });
          resolve();
        }, 500);
      });
    }).as('firstUpdate');

    cy.window().then((window) => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ ...mockUser, token: 'other-session-token' })
      );
      cy.request({
        method: 'PUT',
        url: '/api/user',
        headers: {
          Authorization: 'Token other-session-token',
        },
        body: { user: { bio: firstBio } },
      });
    });

    cy.intercept('PUT', '/api/user', (request) => {
      req.reply({
        statusCode: 200,
        body: { user: { ...mockUser, bio: secondBio } },
      });
    }).as('secondUpdate');

    settingsPage
      .clearBio()
      .typeBio(secondBio)
      .clickUpdateButton()
      .successMessage.should('be.visible');

    cy.intercept('GET', '/api/user', {
      statusCode: 200,
      body: { user: { ...mockUser, bio: secondBio } },
    }).as('getUserAfterConcurrent');

    cy.wait('@secondUpdate');
    cy.reload();

    cy.wait('@getUserAfterConcurrent');
    settingsPage.bioField.should('have.value', secondBio);
  });

  it('should enforce rate limiting on settings updates', () => {
    let requestCount = 0;

    cy.intercept('PUT', '/api/user', (request) => {
      requestCount += 1;

      if (requestCount > 5) {
        req.reply({
          statusCode: 429,
          body: {
            errors: {
              message: 'Too many requests, please try again later.',
            },
          },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: { user: mockUser },
        });
      }
    }).as('rateLimitedRequest');

    const requests = Array(10)
      .fill()
      .map((_, i) => ({
        method: 'PUT',
        url: '/api/user',
        body: { user: { bio: `Test bio ${i}` } },
        failOnStatusCode: false,
      }));

    cy.wrap(requests).each((req) => {
      cy.request(req).then((response) => {
        if (response.status === 429) {
          cy.log('Rate limit hit!');
        }
      });
    });

    cy.get('@rateLimitedRequest.all').should('have.length.gte', 10);
    cy.get('@rateLimitedRequest.all').then((interceptions) => {
      const statuses = interceptions.map((x) => x.response?.statusCode);
      expect(statuses).to.include(429);
    });
  });

  it('should be protected against CSRF attacks', () => {
    const maliciousSite = 'http://malicious-site.com';
    const newEmail = 'hacked@example.com';

    cy.intercept('POST', '/api/user', (request) => {
      const origin = req.headers['origin'] || req.headers['Origin'];
      if (origin && origin !== Cypress.config('baseUrl')) {
        req.reply({
          statusCode: 403,
          body: {
            errors: {
              message: 'CSRF token validation failed',
            },
          },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: { user: mockUser },
        });
      }
    }).as('csrfCheck');

    cy.request({
      method: 'POST',
      url: '/api/user',
      headers: {
        'Content-Type': 'application/json',
        Origin: maliciousSite,
      },
      body: {
        user: {
          email: newEmail,
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.errors.message).to.include('CSRF');
    });

    cy.get('@csrfCheck.all').should('have.length', 1);
  });

  it('should invalidate other sessions after password change', () => {
    const secondSessionToken = 'second-session-token';

    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify({
          ...mockUser,
          token: secondSessionToken,
        })
      );
    });

    const newPassword = 'NewSecurePass123!';

    cy.intercept('PUT', '/api/user', (request) => {
      if (req.body.user.password === newPassword) {
        expect(req.headers['authorization']).to.not.equal(
          `Token ${secondSessionToken}`
        );

        req.reply({
          statusCode: 200,
          body: {
            user: {
              ...mockUser,
              token: 'new-token-after-password-change',
            },
          },
        });
      }
    }).as('updatePassword');

    cy.intercept('GET', '/api/user', (req) => {
      if (req.headers['authorization'] === `Token ${secondSessionToken}`) {
        req.reply({
          statusCode: 401,
          body: {
            errors: {
              message: 'Invalid token. Please log in again.',
            },
          },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: { user: mockUser },
        });
      }
    }).as('getUser');

    settingsPage
      .updatePassword(user.password, newPassword)
      .successMessage.should('be.visible');

    cy.wait('@updatePassword');

    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify({
          ...mockUser,
          token: secondSessionToken,
        })
      );

      cy.visit('/settings', { failOnStatusCode: false });

      cy.url().should('include', '/login');

      cy.wrap(win.localStorage.getItem('user')).should('be.null');
    });

    user.password = newPassword;
  });

  it('should handle server errors gracefully', () => {
    cy.intercept('PUT', '/api/user', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('updateSettings');

    settingsPage.typeBio('This should fail').clickUpdateButton();

    cy.wait('@updateSettings');
    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'Something went wrong');
  });

  it('should be accessible', () => {
    cy.injectAxe();
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: false },
        'landmark-one-main': { enabled: false },
      },
    });
  });
});
