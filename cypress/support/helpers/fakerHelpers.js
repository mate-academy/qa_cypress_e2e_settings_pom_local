import { faker } from '@faker-js/faker';

export function generateUsername() {
  return faker.internet.userName().replace(/\W/g, '').toLowerCase() + faker.number.int({ min: 10, max: 99 });
}

export function generateEmail() {
  return faker.internet.email().toLowerCase();
}

export function generatePassword() {
  return faker.internet.password({ length: 10 });
}

export function generateBio() {
  return faker.lorem.sentence();
}
