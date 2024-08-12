const { faker } = require('@faker-js/faker');

function generateFakeUser() {
  return {
    username: faker.internet.userName().toLowerCase().replace(/\./g, ''),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password().toLowerCase()
  };
}

module.exports = { generateFakeUser };