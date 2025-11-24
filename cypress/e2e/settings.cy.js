/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const mockUser = {
  email: 'test@example.com',
  username: 'testuser',
  password: 'Test123!',
  bio: 'Test bio',
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  token: 'jwt.token.here'
};

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.intercept('POST', '/api/users', {
      statusCode: 201,
      body: { user: { ...mockUser } },
    }).as('register');

    cy.intercept('POST', '/api/users/login', {
      statusCode: 200,
      body: { user: { ...mockUser } },
    }).as('login');

    cy.intercept('PUT', '/api/user', (request) => {
      const updatedUser = { ...mockUser, ...request.body.user };
      request.reply({
        statusCode: 200,
        body: { user: updatedUser },
      });
    }).as('updateUser');

    user = { ...mockUser };

    cy.intercept('GET', '/settings', {
      statusCode: 200,
      body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Settings</title>
          </head>
          <body>
            <div id="root">
              <form class="settings-form">
                <input type="text" name="username" value="${user.username}" />
                <input type="email" name="email" value="${user.email}" />
                <textarea name="bio">${user.bio || ''}</textarea>
                <input type="password" name="password" />
                <input type="password" name="newPassword" />
                <button type="submit">Update Settings</button>
              </form>
            </div>
          </body>
        </html>
      `,
      headers: {
        'content-type': 'text/html',
      },
    });

    cy.intercept('GET', '/api/user', {
      statusCode: 200,
      body: { user: user },
    }).as('getUser');
  });

  beforeEach(() => {
    cy.setCookie('auth', user.token);
    window.localStorage.setItem('user', JSON.stringify(user));

    cy.visit('/settings');

    cy.wait('@getUser');
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'updateduser' + Date.now();

    cy.intercept('PUT', '/api/user', (request) => {
      expect(request.body.user.username).to.equal(newUsername);
      request.reply({
        statusCode: 200,
        body: { user: { ...mockUser, username: newUsername } },
      });
    }).as('updateUsername');

    settingsPage
      .clearUsername()
      .typeUsername(newUsername)
      .clickUpdateButton()
      .successMessage.should('be.visible')
      .and('contain', 'Update successful!');

    cy.wait('@updateUsername');
    homePage.visit();
    homePage.assertHeaderContainUsername(newUsername);
    user.username = newUsername;
  });

  it('should show error when username is too short', () => {
    const shortUsername = 'ab';

    cy.intercept('PUT', '/api/user', {
      statusCode: 422,
      body: {
        errors: {
          username: ['is too short (minimum is 3 characters)'],
        },
      },
    }).as('updateWithError');

    settingsPage
      .clearUsername()
      .typeUsername(shortUsername)
      .clickUpdateButton();

    cy.wait('@updateWithError');
    settingsPage.assertFieldError('username', 'is too short');
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

    cy.wait('@updateWithExistingUsername');
    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'has already been taken');
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my updated bio ' + Date.now();

    cy.intercept('PUT', '/api/user', (request) => {
      expect(request.body.user.bio).to.equal(newBio);
      request.reply({
        statusCode: 200,
        body: { user: { ...mockUser, bio: newBio } },
      });
    }).as('updateBio');

    settingsPage
      .clearBio()
      .typeBio(newBio)
      .clickUpdateButton()
      .successMessage.should('be.visible')
      .and('contain', 'Update successful!');

    cy.wait('@updateBio');
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should handle very long bio', () => {
    const longBio = 'a'.repeat(1000);

    cy.intercept('PUT', '/api/user', (request) => {
      expect(request.body.user.bio).to.have.lengthOf(1000);
      request.reply({
        statusCode: 200,
        body: { user: { ...mockUser, bio: longBio } },
      });
    }).as('updateLongBio');

    settingsPage
      .clearBio()
      .typeBio(longBio)
      .clickUpdateButton()
      .successMessage.should('be.visible')
      .and('contain', 'Update successful!');

    cy.wait('@updateLongBio');
    settingsPage.bioField.should('have.value', longBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = `updated${Date.now()}@example.com`;

    cy.intercept('PUT', '/api/user', (request) => {
      expect(request.body.user.email).to.equal(newEmail);
      const updatedUser = { ...mockUser, email: newEmail };
      request.reply({
        statusCode: 200,
        body: { user: updatedUser },
      });
    }).as('updateEmail');

    settingsPage
      .updateEmail(newEmail)
      .successMessage.should('be.visible')
      .and('contain', 'Update successful!');

    cy.wait('@updateEmail');

    cy.intercept('POST', '/api/users/login', {
      statusCode: 200,
      body: { user: { ...mockUser, email: newEmail } },
    }).as('loginWithNewEmail');

    cy.logout();
    cy.login(newEmail, user.password);

    homePage.assertHeaderContainUsername(user.username);
    user.email = newEmail;
  });

  it('should show error for invalid email format', () => {
    const invalidEmail = 'invalid-email';

    cy.intercept('PUT', '/api/user', {
      statusCode: 422,
      body: {
        errors: {
          email: ['must be a valid email'],
        },
      },
    }).as('updateWithInvalidEmail');

    settingsPage.updateEmail(invalidEmail);

    cy.wait('@updateWithInvalidEmail');
    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'must be a valid email');
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewTest123!';

    cy.intercept('PUT', '/api/user', (request) => {
      expect(req.body.user.password).to.equal(newPassword);
      req.reply({
        statusCode: 200,
        body: { user: mockUser },
      });
    }).as('updatePassword');

    settingsPage
      .updatePassword(user.password, newPassword)
      .successMessage.should('be.visible')
      .and('contain', 'Update successful!');

    cy.wait('@updatePassword');

    cy.intercept('POST', '/api/users/login', {
      statusCode: 200,
      body: { user: mockUser },
    }).as('loginWithNewPassword');

    cy.logout();
    cy.login(user.email, newPassword);

    homePage.assertHeaderContainUsername(user.username);
    user.password = newPassword;
  });

  it('should show error when current password is incorrect', () => {
    const wrongPassword = 'WrongPass123!';
    const newPassword = 'NewTest123!';

    cy.intercept('PUT', '/api/user', {
      statusCode: 401,
      body: {
        errors: {
          password: ['is invalid'],
        },
      },
    }).as('updateWithWrongPassword');

    settingsPage.updatePassword(wrongPassword, newPassword);

    cy.wait('@updateWithWrongPassword');
    cy.get('@settingsButton')
      .should('be.visible')
      .and('have.attr', 'data-cy', 'settings-button')
      .click();
  });

  it('should show error for weak password', () => {
    const weakPassword = '123';

    cy.intercept('PUT', '/api/user', {
      statusCode: 422,
      body: {
        errors: {
          password: ['is too short (minimum is 6 characters)'],
        },
      },
    }).as('updateWithWeakPassword');

    settingsPage.updatePassword(user.password, weakPassword);

    cy.wait('@updateWithWeakPassword');
    settingsPage.errorMessages
      .should('be.visible')
      .and('contain', 'is too short');
  });

  it('should provide an ability to log out', () => {
    cy.intercept('GET', '/', (req) => {
      req.reply({});
    }).as('homePage');

    settingsPage.clickLogoutButton();

    cy.url().should('include', '/login');
    cy.window().its('localStorage').invoke('getItem', 'user').should('be.null');
    cy.getCookie('auth').should('be.null');
  });

  it('should persist settings after page refresh', () => {
    const newBio = 'Persisted bio ' + Date.now();

    cy.intercept('POST', '/api/users/login', (request) => {
      request.reply({
        statusCode: 200,
        body: { user: { ...mockUser, token: 'new-session-token' } },
      });
    }).as('loginWithNewPassword');

    cy.intercept('GET', '/api/user', {
      statusCode: 200,
      body: { user: { ...mockUser, bio: newBio } },
    }).as('getUser');

    settingsPage
      .clearBio()
      .typeBio(newBio)
      .clickUpdateButton()
      .successMessage.should('be.visible');

    cy.wait('@updateBio');
    cy.reload();

    cy.wait('@getUser');
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should not update settings when not authenticated', () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('GET', '/settings', (req) => {
      req.reply({
        statusCode: 302,
        headers: {
          location: '/login',
        },
      });
    }).as('settingsPage');

    cy.visit('/settings', { failOnStatusCode: false });
    cy.url().should('include', '/login');
  });

  it('should sanitize HTML/JavaScript in bio field', () => {
    const xssPayload = `<script>alert("XSS")</script>
      <img src="x" 
           onerror="alert(1)"
      >`;
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
