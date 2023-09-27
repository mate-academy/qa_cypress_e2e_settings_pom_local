import { defineConfig } from "cypress";
const faker = require("faker");
const { clear } = require("./dataBase");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1620,
    viewportWidth: 1080,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          let userName = faker.name.firstName() + `${randomNumber}`
          return {
            username: userName.toLowerCase(),
            email: 'test'+`${randomNumber}`+'@mail.com',
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
        generateSettingsInfo() {
          let username = faker.name.firstName();
          let email = faker.internet.email();
          return {
            urlPicture: faker.image.abstract(),
            username: username.toLowerCase(),
            bio: faker.random.words(),
            email: email.toLowerCase(),
            password: 'strongPassword123!',
            newPassword: 'newPassword12345!',
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
