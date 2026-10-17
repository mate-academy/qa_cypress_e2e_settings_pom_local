const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,

    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const suffix = faker.string.alphanumeric(8).toLowerCase();

          const username = `qa${faker.person.firstName()}${suffix}`
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase();

          return {
            username,
            email: `qa.${suffix}@example.com`,
            password: '12345Qwert!',
          };
        },

        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
          };
        },

        async 'db:clear'() {
          await clear();

          return null;
        },
      });

      return config;
    },
  },
});
