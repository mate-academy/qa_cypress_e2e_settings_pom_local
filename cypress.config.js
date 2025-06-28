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

          let userName = `${faker.name
            .firstName()
            .replace(/[^\w]+/g, '')
            .toLowerCase()}${randomNumber}`;

          return {
            username: userName,
            email: `${userName}@mail.com`,
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
