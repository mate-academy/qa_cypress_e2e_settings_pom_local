import { defineConfig } from 'cypress';
const faker = require('faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.floor(Math.random(1000) * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: 'test'+`${randomNumber}`+'@mail.com',
            password: '12345Qwert!',
          };
        },
        generateArticle() {
          return {
            title: faker.random.word(),
            description: faker.random.words(),
            body: faker.random.words(),
            tag: faker.random.word()
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
