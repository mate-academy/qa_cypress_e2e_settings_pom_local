const { defineConfig } = require('cypress');
const faker = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: (faker.person.firstName()).toLowerCase() + randomNumber,
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password()
          };
        },
        generateUpdateData() {
          return {
            usernameChanged: (faker.person.firstName()).toLowerCase(),
            bioChanged: faker.lorem.words(50), 
            emailChanged: faker.internet.email().toLowerCase(),
            passwordChanged: faker.internet.password()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word()
          };;
        },
        'db:clear'() {
          clear();
          return null;
        },
      });
    },
  },
});
