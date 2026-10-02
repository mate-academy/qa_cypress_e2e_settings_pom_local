import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = faker.string.alphanumeric(20).toLowerCase();
          const userName = `user${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: `${userName}@example.com`,
            password: faker.internet.password({ length: 20 }) + 'Aa1!',
            bio: faker.lorem.sentence(),
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
          return clear().then(() => null);
        },
      });
    },
  },
});
