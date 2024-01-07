/* eslint-disable quotes */
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
          let userName = faker.name.firstName() + `${randomNumber}`;
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
        generateUpdateData() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000);
          return {
            bio: faker.lorem.words(),
            email: 'test'+`${randomNumber}`+'.updated'+'@mail.com',
            password: '12345Qwert!updated'
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
