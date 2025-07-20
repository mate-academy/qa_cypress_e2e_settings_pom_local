// cypress.config.js
import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random() * 1000); 
          let userName = faker.string.alpha({ 
            length: 8, casing: 'lower' }) + randomNumber; 
          return {
            username: userName,
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ 
              length: 12, upper: true, 
              lower: true, 
              numeric: true, 
              symbols: true }),
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word()
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
