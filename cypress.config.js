import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

function generateUsername() {
  let name = faker.internet.userName();
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  if (!/^[a-zA-Z]/.test(name)) {
    name = 'a' + name;
  }
  return name.slice(0, 40);
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const username = generateUsername();
          const password = faker.internet.password(12, true);

          return {
            username: username.toLowerCase(),
            // email: `test_${Math.floor(Math.random() * 100000)}@mail.com`,
            email: faker.internet.email({
              provider: 'mail.com'
            }).toLowerCase(),
            password,
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
