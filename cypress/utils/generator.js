import { faker } from '@faker-js/faker';

export const generateUsername = () => {
  return `${faker.internet.userName().toLowerCase()}_${faker.number.int({ min: 1000, max: 9999 })}`;
};

export const generateEmail = () => {
  return faker.internet.email().toLowerCase();
};

export const generatePassword = () => {
  return faker.internet.password({ length: 10, memorable: true });
};

export const generateBio = () => {
  return faker.lorem.sentence();
};
