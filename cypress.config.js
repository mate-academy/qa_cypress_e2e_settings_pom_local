import { defineConfig } from 'cypress';
import { faker } from '@faker-js/faker';
import { clear } from './dataBase';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random() * 1000);
          let userName = faker.person.firstName() + `${randomNumber}`;
          return {
            username: userName.toLowerCase(),
            email: 'test'+`${randomNumber}`+'@gmail.com',
            password: '12345Qwert!',
          };
        },
        generateDataUserSettings() {
          let randomNumber = Math.ceil(Math.random() * 1000);
          let userName = faker.person.firstName() + Math.ceil
            (Math.random() * 1000);
          return {
            username: userName.toLowerCase(),
            newUserName: faker.person.firstName() + Math.ceil
            (Math.random() * 1000),
            bio: faker.lorem.words(3),
            email: 'test'+`${randomNumber}`+'@gmail.com',
            newEmail: `${userName}`+`${randomNumber}`+'@gmail.com',
            password: '1qaz2wsx',
            newPassword: faker.internet.password() + Math.ceil
              (Math.random() * 1000)
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
