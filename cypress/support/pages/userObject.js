//userObject
import { faker } from '@faker-js/faker';
import * as customComands from '../customCommands.js';

const { returnRandom, stringTransformator, ArgumentError }
  = customComands;

class RequirementsToTransformFunction {
  /**
   * 
   * @param {boolean} spaceAllowed 
   * @param {number} specialCharacter 
   * @param {number} digits 
   * @param {number} upperCase 
   * @param {number} length 
   * @param {boolean} randomizeOutput 
   */
  constructor(
    spaceAllowed,
    specialCharacter,
    digits,
    upperCase,
    length,
    randomizeOutput,
  ) {
    const hasMinLength = arguments.length === 6;

    if (!hasMinLength) {
      throw new ArgumentError('"RequirementsToTransformFunction"' +
        ' require 6 arguments');
    }

    const hasAppropriateTypes =
      (typeof spaceAllowed == 'boolean') &&
      (typeof specialCharacter == 'number') &&
      (typeof digits === 'number') &&
      (typeof upperCase === 'number') &&
      (typeof length === 'number') &&
      (typeof randomizeOutput === 'boolean');

    if (!hasAppropriateTypes) {
      throw new ArgumentError('"RequirementsToTransformFunction"' +
        'has at least one argument with wrong type');
    }

    this.spaceAllowed = spaceAllowed;
    this.specialCharacter = specialCharacter;
    this.digits = digits;
    this.upperCase = upperCase;
    this.length = length;
    this.randomizeOutput = randomizeOutput; 
  }
}

const generateUsernameRequirement = () => {
  const args = [
    false, // spaceAllowed
    0, // special characters
    0, //digits
    0, //upperCase
    returnRandom([3, 4, 5, 6, 7, 8, 9, 10, 15, 21, 35, 40]), //length
    false //randomise
  ];

  return new RequirementsToTransformFunction(...args);
};
const generatePasswordRequirement = () => {
  const args = [
    true, 
    returnRandom([1, 2, 3]), 
    returnRandom([1, 2, 3]),
    returnRandom([1, 2, 3]),
    returnRandom([3, 4, 5, 6, 7, 8, 9, 10, 15, 21, 35, 40]), 
    false
  ];

  const isTooMany = (args[1] + args[2] + args[3]) > args[4];
    
  if (isTooMany) {
    const checkIsOk = () => {
      return args[4] >= (args[1] + args[2] + args[3]);
    };
  
    do {
      const isSpecialTheBiggest =
        args[1] >= args[2] &&
        args[1] >= args[3];
      const isDigitTheBiggest =
        args[2] >= args[1] &&
        args[2] >= args[3];
      const isUpperCaseTheBiggest =
        args[3] >= args[1] &&
        args[3] >= args[2];

      switch(true) {
        case isSpecialTheBiggest:
          args[1]--;
          break;
        case isDigitTheBiggest:
          args[2]--;
          break;
        case isUpperCaseTheBiggest:
          args[3]--;
          break;
      }
    } while (!checkIsOk());
  }

  return new RequirementsToTransformFunction(...args);
};

class UserObj {
  username = '';
  email = '';
  password = '';
  bio = '';
  newUsername = '';
  newEmail = '';
  newPassword = '';
  newBio = '';

  /**
   * 
   * @param {string} username default value = random value
   * @param {string} email default value = random value
   * @param {string} password default value = random value
   * @param {string} bio default value = random value
   * @param {string} newUsername default value = random value
   * @param {string} newEmail default value = random value
   * @param {string} newPassword default value = random value
   * @param {string} newBio default value = random value
   */
  constructor(
    username,
    email,
    password,
    bio,
    newUsername,
    newEmail,
    newPassword,
    newBio
  ) {

    for (let arg of arguments) {
      if (arg !== undefined && typeof arg !== 'string') {
        throw new ArgumentError('All arguments must be String');
      }
    }

    const generateBase = () => {
      return returnRandom([faker.person.firstName(), faker.person.lastName(),
        faker.animal.type(), faker.color.human()]);
    };

    const generateDescription = () => {
      return returnRandom([
        faker.commerce.productDescription(),
        faker.lorem.sentence(returnRandom([1, 2, 3, 4, 5])),
        faker.hacker.phrase(),
        faker.music.songName(),
      ]);
    }; 

    this.username = username
      ?? stringTransformator(generateBase(), generateUsernameRequirement());
    this.email = email ?? faker.internet.email({
        options: {
          firstName: generateBase()
            .replace(/ /g, ''),
          lastName: undefined,
          allowSpecialCharacters: false
        }
      }).toLowerCase();
    this.password = password
      ?? stringTransformator(generateBase(), generatePasswordRequirement());
    this.bio = bio
      ?? generateDescription();
    this.newUsername = newUsername
      ?? stringTransformator(generateBase(), generateUsernameRequirement());
    this.newEmail = newEmail ?? faker.internet.email({
        options: {
          firstName: generateBase().replace(/ /g, ''),
          lastName: undefined,
          allowSpecialCharacters: false
        }
      }).toLowerCase();
    this.newPassword = newPassword
      ?? stringTransformator(generateBase(), generatePasswordRequirement());
    this.newBio = newBio
      ?? generateDescription();
  }
}

export default UserObj;