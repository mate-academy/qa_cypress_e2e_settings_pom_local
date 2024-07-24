import { defineConfig } from 'cypress';
const { faker } = require('@faker-js/faker');
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      on('task', {
        generateUserData() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const gender = faker.helpers.arrayElement(['male', 'female']);
          const name = faker.person.firstName(gender);
          const username = `${name}${randomNumber}`;
          const randomWord = faker.lorem.word({ length: { min: 5, max: 10 } });
          const capitalLetter = randomWord.charAt(0);
          const password = `${capitalLetter}`
            + `${randomWord.slice(1, randomWord.length)}`
            + `${randomNumber}`;
          const bio = faker.lorem.sentence({ min: 3, max: 5 });
          const domain = faker.internet.domainWord();
          const topDomain = faker.internet.domainSuffix();

          return {
            username: username.toLowerCase(),
            email: `test-${username.toLowerCase()}${randomNumber}@${domain}.${topDomain}`,
            password,
            bio
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
