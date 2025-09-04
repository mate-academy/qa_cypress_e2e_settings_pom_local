// cypress.config.js
const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

function makeUsername() {
  return (
    faker.string.alpha({ length: 1, casing: 'lower' }) +
    faker.string.alphanumeric({ length: 9, casing: 'lower' }).replace(/[^a-z0-9]/g, '')
  );
}

function makeEmail(username) {
  return `qa_${username}_${Date.now()}@testmail.com`;
}

function makePassword() {
  return `${faker.internet.password({ length: 10, memorable: false })}Q1!`;
}

function makeArticle() {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(6),
    body: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
  };
}

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://conduit.mate.academy',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,

    setupNodeEvents(on, config) {
      const isLocal =
        (config.baseUrl || '').startsWith('http://localhost') ||
        (config.baseUrl || '').startsWith('https://localhost');

      const tasks = {
        'db:clear'() {
          if (isLocal) {
            try {
              const { clear } = require('./dataBase');
              return clear();
            } catch (_) {
              // no-op to satisfy no-console
            }
          }
          return null;
        },

        generateUser() {
          const username = makeUsername();
          return {
            username,
            email: makeEmail(username),
            password: makePassword(),
          };
        },

        generateArticle() {
          return makeArticle();
        },
      };

      on('task', tasks);
      return config;
    },
  },
});
