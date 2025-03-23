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
            email: 'test'+`${randomNumber}`+'@mail.com',
            password: '12345Qwert!',
          };
        },
        generateArticle() {
          const title = faker.lorem.sentence();
          const description = faker.lorem.paragraph();
          const body = faker.lorem.paragraphs();

          return {
            title: title,
            description: description,
            body: body,
          };
        },
        generateSettings() {
          const url = faker.internet.url();
          const username = faker.internet.userName();
          const bio = faker.lorem.paragraph();
          const email = faker.internet.email();
          const password = faker.internet.password();

          return {
            url: url,
            username: username,
            bio: bio,
            email: email,
            password: password
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
