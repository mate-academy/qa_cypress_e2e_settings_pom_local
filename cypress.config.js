import { defineConfig } from 'cypress'
const { faker } = require('@faker-js/faker')
const { clear } = require('./dataBase')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          let randomNumber = Math.ceil(Math.random(1000) * 1000)
          let userName = faker.person.firstName() + `${randomNumber}`
          return {
            email: faker.internet.email().toLowerCase(),
            username: faker.person.firstName().toLowerCase(),
            password: '12345Qwert!',
          }
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
          }
        },
        'db:clear'() {
          clear()
          return null
        },
      })
    },
  },
})
