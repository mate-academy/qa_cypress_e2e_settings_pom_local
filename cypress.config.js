const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

const generateUsername = () => {
  return `user${faker.string.alphanumeric(8).toLowerCase()}`;
};

const generateEmail = () => {
  return `${faker.string.alphanumeric(10).toLowerCase()}@mail.com`;
};

const generatePassword = () => {
  return `${faker.string.alphanumeric(10)}Aa1!`;
};

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('task', {
        generateUser() {
          return {
            username: generateUsername(),
            email: generateEmail(),
            password: generatePassword(),
          };
        },
        generateSettingsData() {
          return {
            username: generateUsername(),
            bio: faker.lorem.sentence(),
            email: generateEmail(),
            password: generatePassword(),
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
        'db:clear'() {
          return clear().then(() => null);
        },
      });
    },
  },
});
