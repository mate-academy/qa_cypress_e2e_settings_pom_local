/* eslint-disable max-len */
import { faker } from '@faker-js/faker';

export const generateUsername = () => {
  let base = faker.internet.userName().toLowerCase().replace(/[^a-z0-9_]/g, '');
  base = base.slice(0, 15); 
  const suffix = faker.number.int({ min: 1000, max: 9999 });
  return `${base}_${suffix}`;
};

export const generateEmail = () => {
  const unique = Date.now() + faker.number.int({ min: 1000, max: 9999 });
  return `user${unique}@testmail.com`;
};

export const generatePassword = () => {
  const upper = faker.string.alpha({ length: 1, casing: 'upper' });
  const lower = faker.string.alpha({ length: 1, casing: 'lower' });
  const digit = faker.number.int({ min: 0, max: 9 }).toString();
  const symbol = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*']);
  const rest = faker.string.alphanumeric({ length: 6 });

  const password = faker.helpers.shuffle([upper, lower, digit, symbol, ...rest.split('')]).join('');
  return password;
};

export const generateBio = () => {
  const token = faker.number.int({ min: 1000, max: 9999 });
  return `This is a test bio ${token}`;
};
