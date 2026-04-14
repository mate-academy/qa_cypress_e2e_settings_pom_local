const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          const userName = faker.person.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: `test${randomNumber}@mail.com`,
            password: '12345Qwert!',
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(1),
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