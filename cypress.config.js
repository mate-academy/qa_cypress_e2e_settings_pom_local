import { defineConfig } from 'cypress';
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(100000) * 100000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: userName.toLocaleLowerCase() +`${randomNumber}`+'@mail.com',
            password: '12345Qwert!',
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
        updateUser() {
          return {
            username: faker.internet.userName().toLowerCase(),
            bio: faker.person.bio(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password()
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
