const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          // Correct random number generation
          let randomNumber = Math.floor(Math.random() * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: `test${randomNumber}@mail.com`, // Template literal for cleaner code
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
        'db:clear'() {
          clear();
          return null;
        },
      });
    },
  },
});