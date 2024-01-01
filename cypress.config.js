import { defineConfig } from 'cypress';
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    viewportHeight: 1080,
    viewportWidth: 1320,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          let userName = faker.person.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: 'test'+`${randomNumber}`+'@mail.com',
            password: '12345Qwert!',
            bio: faker.lorem.words(10)
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
