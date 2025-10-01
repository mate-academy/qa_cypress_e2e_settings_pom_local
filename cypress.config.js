// cypress.config.js
const { defineConfig } = require('cypress')
const { clear } = require('./dataBase') // ✅ root-level dataBase.js

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,
    screenshotOnRunFailure: true,

    const { defineConfig } = require('cypress')
const { clear, reset } = require('./dataBase')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        'db:clear': () => clear(),
        'db:reset': () => reset(),
      })
    },
    baseUrl: 'http://localhost:3000',
  },
})

    setupNodeEvents(on, config) {
      on('task', {
        async 'db:clear'() {
          try {
            return await clear() // ✅ return Promise so Cypress waits
          } catch (err) {
            console.error('❌ DB clear failed:', err)
            throw err
          }
        },
      })

      return config
    },
  },
})
