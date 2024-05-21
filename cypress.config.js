const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            username: faker.name.firstName().toLowerCase(),
            email: faker.internet.email().toLowerCase(),
            password: faker.lorem.word()
          };
        },
        editUser() {
          return {
            username: faker.name.firstName().toLowerCase(),
            bio: faker.lorem.words(10),
            email: faker.internet.email().toLowerCase(),
            password: faker.lorem.word()
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
