const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random() * 1000);
          const userName = faker.name.firstName().toLowerCase() + randomNumber;
          return {
            username: userName,
            email: `test${randomNumber}@mail.com`,
            password: faker.internet.password(),
            bio: faker.lorem.word(),
          };
        },
        generateUpdateData() {
          const userName = faker.internet.userName().toLowerCase() + '_update';
          const newEmail = faker.internet.email().toLowerCase();
          return {
            username: userName,
            bio: faker.lorem.sentence(),
            email: newEmail,
            password: 'newPassword1!',
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(10),
            body: faker.lorem.paragraphs(1),
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