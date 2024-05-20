import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';
import { userInfo } from 'os';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
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
