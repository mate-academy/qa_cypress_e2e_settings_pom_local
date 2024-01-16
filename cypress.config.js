import { defineConfig } from 'cypress';
const faker = require('faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`;
          let newUsername = faker.name.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            newUserName: newUsername.toLowerCase(),
            email: 'test'+`${randomNumber}`+'@mail.com',
            newEmail: 'test'+`${randomNumber}`+'@mail.com',
            password: '12345Qwert!',
            newPassword: '987654Mmnbv@',
            bio: faker.lorem.words()
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
