import { defineConfig } from "cypress";
const faker = require("faker");
const { clear } = require("./dataBase");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
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
          };;
        },
        'db:clear'() {
          clear();
          return null;
        },
      });

      on('task', {
        generateTestData() {
          return {
            edited_username: faker.name.firstName(),
            edited_bio: faker.lorem.word(5),
            edited_email: faker.internet.email(),
            edited_password:  faker.internet.password({ length: 8 }),
          };
        },
      });
    },
  },
});
