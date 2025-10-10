/* eslint-disable no-console */
/* eslint-disable max-len */
import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      on('task', {
        async 'db:clear'() {
          try {
            await Promise.resolve(clear());
            console.log('✅ DB cleared successfully');
            return true;
          } catch (err) {
            console.error('❌ DB clear failed:', err.message);
            throw err;
          }
        },

        generateUser() {
          const randomNumber = faker.number.int({ min: 1000, max: 9999 });
          const username = faker.internet.userName().toLowerCase() + randomNumber;

          return {
            username,
            email: `test_${randomNumber}@mail.com`,
            password: 'Qwerty123!',
          };
        },

        generateArticle() {
          return {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(5),
            body: faker.lorem.paragraph(),
            tag: faker.lorem.word(),
          };
        },
      });
    },
  },
});
