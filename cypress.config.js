import { defineConfig } from 'cypress';
const faker = require('faker');
const { clear } = require('./dataBase');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: true,
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          return {
            username: faker.name.firstName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
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
        customVariables() {
          return {
            field: {
            username: 'username',
            bio: 'bio',
            email: 'email',
            password: 'password',
            },
            button: {
            updateButton: 'Update Settings',
            logoutButton: 'Or click here to logout.'
            },
            signUp: 'Sign up'
          };
        }
      });
    },
  },
});
