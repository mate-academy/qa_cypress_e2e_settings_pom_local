import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: 'test' + `${randomNumber}` + '@mail.com',
            password: '12345Qwert!',
            updateUsername: faker.internet.userName() + `${randomNumber}`,
            updateEmail: faker.lorem.word() + `${randomNumber}` + '@mail.com',
            bio: faker.lorem.word(),
            updatePassword: 'Password6789$'
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
        async 'db:clear'() {
          await clear();
          return null;
        },
      });
    },
  },
});
