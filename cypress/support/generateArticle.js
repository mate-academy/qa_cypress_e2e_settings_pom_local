/* eslint-disable max-len */
const { faker } = require('@faker-js/faker');
function generateArticle() {
  let title = faker.lorem.words(faker.datatype.number({ min: 1, max: 2 }));
  let description = faker.lorem.words(faker.datatype.number({ min: 3, max: 5 }));
  let body = faker.lorem.sentences(faker.datatype.number({ min: 6, max: 10 }));

  return { title, description, body };
}

module.exports = { generateArticle };
