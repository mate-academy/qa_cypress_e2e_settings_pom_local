import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      on('task', {
        generateUser() {
          const randomNumber = faker.number.int({ min: 1000, max: 9999 });
          const username = `user${randomNumber}`;
          const email = `user${randomNumber}@mail.com`;

          return {
            username,
            email,
            password: '12345Qwert!',
            bio: faker.lorem.sentence(),
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