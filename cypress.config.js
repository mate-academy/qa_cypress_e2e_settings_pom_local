/* eslint-disable max-len */
// cypress.config.js
const { defineConfig } = require('cypress');
const { execSync } = require('child_process');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // РЕГИСТРАЦИЯ ТАСКОВ ДЛЯ CI/ЛОКАЛЬНЫХ ТЕСТОВ
      on('task', {
        'db:clear'() {
          execSync('node bin/generate-demo-data.js --empty', { stdio: 'inherit' });
          return null;
        },
        'db:seed'() {
          execSync('node bin/generate-demo-data.js', { stdio: 'inherit' });
          return null;
        },
      });

      return config;
    },
  },
});
