//customComand
class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ArgumentError';  
  }
}
/**
 * 
 * @param {object} objPattern 
 * @param {object} objToTest,
 * @param {boolean} onlyStructure, 
 * @param {boolean} printOnConsole, 
 * @returns {boolean}
 */
function isTheSameStructureOfObj(
  objPattern, objToTest, onlyStructure = false, printOnConsole = false
) {
  function walkThroughObj(pattern, test) { 
    const actualPropertyType = Object.prototype.toString.call(pattern);
    const actualPropertyTypeOfTest = Object.prototype.toString.call(test);

    if (actualPropertyType !== actualPropertyTypeOfTest) {
      throw new Error(`"ObjToTest" has different structure than "objPattern" (Correct: ${actualPropertyType} Inncorrect: ${actualPropertyTypeOfTest})`);
    } else if ((actualPropertyType === '[object Object]' ||
      actualPropertyType === '[object Array]') && !onlyStructure) {
      const keysFromPattern = Object.keys(pattern);
      const keysFromTest = Object.keys(test);
            
      if (keysFromPattern.length !== keysFromTest.length) {
        throw new Error(`"ObjToTest" has different structure than "objPattern" (Amount of Properties)`);
      }

      keysFromPattern.forEach((keyPattern, i) => {       
        if (keyPattern !== keysFromTest[i]) {
          throw new Error(`"ObjToTest" has at least one different name of key from "objPattern" (Correct: ${keyPattern} Incorrect: ${keysFromTest[i]})`);
        } 
      });
    } else if ((actualPropertyType === '[object Object]' ||
      actualPropertyType === '[object Array]') && onlyStructure) {
      const keysFromPattern = Object.keys(pattern);
      const keysFromTest = Object.keys(test);

      if (keysFromPattern.length !== keysFromTest.length) {
        throw new Error('"ObjToTest" has different structure than' +
          '"objPattern" (Amount of Properties)');
      } 
    }

    switch(true) {
      case !(actualPropertyType === '[object Object]' ||
        actualPropertyType === '[object Array]'):
          if ((!onlyStructure) && (pattern !== test)) {
            throw new Error(`"ObjToTest" has at least one different value of key from "objPattern" (Correct: ${pattern} Incorrect: ${test})`);
          }
          return;
      case actualPropertyType === '[object Object]':
          for (let i = 0; i < Object.values(pattern).length; i++) {
            const actualPropertyOfPattern = Object.values(pattern)[i];
            const actualPropertyOfTest = Object.values(test)[i];
              
            walkThroughObj(actualPropertyOfPattern, actualPropertyOfTest);
          }
          
        return;
      case actualPropertyType === '[object Array]':
        for (let i = 0; i < pattern.length; i++) {
          const actualElementOfPattern = pattern[i];
          const actualElementOfTest = test[i];
          
          walkThroughObj(actualElementOfPattern, actualElementOfTest);
        }
          
      return;
    }
  }
        
  const arg1Type = typeof objPattern;
  const arg2Type = typeof objToTest;
  const arg3Type = typeof onlyStructure;
  const arg4Type = typeof printOnConsole;

  switch(true) {
    case objPattern === null:
      throw new Error('"objPattern cannot be null"');
    case arg1Type !== 'object':
      throw new Error('"objPattern" cannot be primitive type');
    case objToTest === null:  
      throw new Error('"ObjToTest cannot be null"');
    case arg2Type !== 'object':
      throw new Error('"objToTest cannot be primitive type"');
    case arg3Type !== 'boolean':
      throw new Error('"onlyStructure" must be Boolean');
    case arg4Type !== 'boolean':
      throw new Error('"printOnConsole" must be Boolean');
  }

  try {
    walkThroughObj(objPattern, objToTest);
  } catch(error) {
    if (printOnConsole) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return false;
  }

  return true;
}

/**
 * 
 * @param {string} string 
 * @returns {string}
 */
function randomize(string) {
  if (typeof string !== 'string') {
    throw new Error('"string" must be String');
  }

  const letterBase = string.split('');
  const repeatLimit = string.length; 
  let randomizedString = '';

  for (let i = 0, maxRandom = repeatLimit; i < repeatLimit; i++, maxRandom--) {
    const randomIndex = Math.floor(Math.random() * maxRandom);
      
    randomizedString += letterBase.splice(randomIndex, 1);
  }

  return randomizedString;  
}
/**
 * 
 * @param {string} stringToTransform 
 * @param {object: } requirements 
 * @returns {string}
 */
function stringTransformator(
  stringToTransform,
  requirements = {
    spaceAllowed: false,
    specialCharacter: 1,
    digits: 1,
    upperCase: 1,
    length: 3,
    randomizeOutput: false
  }) {
  const isRequirementsObj =
    Object.prototype.toString.call(requirements) === '[object Object]';
  const patternStructure = {
    spaceAllowed: requirements.hasOwnProperty('spaceAllowed')
      ? requirements.spaceAllowed
      : null ,
    specialCharacter: requirements.hasOwnProperty('specialCharacter')
      ? requirements.specialCharacter
      : null,
    digits: requirements.hasOwnProperty('digits')
      ? requirements.digits 
      : null,
    upperCase: requirements.hasOwnProperty('upperCase') ?
      requirements.upperCase 
      : null,
    length: requirements.hasOwnProperty('length') ?
      requirements.length 
      : null,
    randomizeOutput: requirements.hasOwnProperty('randomizeOutput') ?
      requirements.randomizeOutput 
      : null
  };
      
  switch(true) {
    case typeof stringToTransform !== 'string':
      throw new ArgumentError('"stringToTransform" must be String');
    case !isRequirementsObj:
      throw new ArgumentError('"requirements" must be an Object');
    case !isTheSameStructureOfObj(patternStructure, requirements, false): // test properites name + number of properties
      throw new ArgumentError('"requirements" has invalid structure' +
        '(look "requirements" default structure from "stringTransformator")');
    case !isTheSameStructureOfObj( // test type of value of properties
      {
        spaceAllowed: Boolean(),
        specialCharacter: Number(),
        digits: Number(),
        upperCase: Number(),
        length: Number(),
        randomizeOutput: Boolean()
      }, patternStructure, true):
        throw new ArgumentError('At least one of the "requirements"' +
          ' properties has invalid type of value');
  }

  const {
    spaceAllowed,
    specialCharacter,
    digits,
    upperCase,
    length,
    randomizeOutput
  } = requirements;

  switch(true) { // test requirements dependencies
    case specialCharacter + digits + upperCase > length:
      throw new ArgumentError('"Length" must be greater or equal than sum of;' +
        '"digits", "upperCase", "specialCharacter"');
    case specialCharacter < 0:
      throw new ArgumentError('"specialCharacter" must be greater than -1');
    case digits < 0:
      throw new ArgumentError('"digits" must be greater than -1');
    case upperCase < 0:
      throw new ArgumentError('"upperCase" must be greater than -1');
  }

  const actualSpecialCharacters = stringToTransform.match(/[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/g)?.length ?? 0;
  const actualDigits = stringToTransform.match(/\d/g)?.length ?? 0;
  const actualUpperCase = stringToTransform.match(/\p{Lu}/gu)?.length ?? 0;
  const actualLength = stringToTransform.length;
  const isInvalidStringCheck = 
    (actualSpecialCharacters !== specialCharacter) ||
    (actualDigits !== digits) ||
    (actualUpperCase !== upperCase) ||
    (actualLength !== length);
  let correctString = stringToTransform;

  if (isInvalidStringCheck) {
    const charsForAdding = [
      `!"#$%&'()*+,-.:;<=>?@[]^_\`{|}~\\`.split(''),
      '0123456789'.split(''),
      'qwertyuioplkjhgfdsazxcvbnm'.split('')
    ];
    const [specialCharactersList, digitsList, lettersList] = charsForAdding;
    const whatToDo = (() => { //actually what do with type of data
      const specialToRemove = actualSpecialCharacters - specialCharacter;
      const digitToRemove = actualDigits - digits;
      const upperCaseToRemove = actualUpperCase - upperCase;

      return [specialToRemove, digitToRemove, upperCaseToRemove];
    })();

    if (!spaceAllowed) {
      correctString = correctString.replace(/ /g, '');
    }

    whatToDo.forEach((charTypeNumber, index) => {
      if (charTypeNumber === 0) {
        return;
      }
      let regexToReplaceMethod;
      let indexForAdding;
      const howManyReplace = Math.max(charTypeNumber, 1);
      const howManyAdd = Math.abs(charTypeNumber);
      
      switch(index) {
        case 0: //special regex
          regexToReplaceMethod = new RegExp(/[!"#$%&'()*+,\-.:;<=>?@[\]^_`{|}~]/);
          indexForAdding = specialCharactersList.length;
          break;
        case 1: //digits regex
          regexToReplaceMethod = new RegExp(/\d/);
          indexForAdding = digitsList.length;
          break;
        case 2: //upperCase regex
          regexToReplaceMethod = new RegExp(/\p{Lu}/, 'u');
          indexForAdding = lettersList.length;
          break;
      }
        
      switch(Math.sign(charTypeNumber)) {
        case 1: //removing
          for (let i = 0; i < howManyReplace; i++) {
            correctString = correctString.replace(regexToReplaceMethod, '');
          }
          return;
        case -1: //adding
          for (let i = 0; i < howManyAdd; i++) {
            const randomIndex = Math.floor(Math.random() * indexForAdding);
  
            correctString += charsForAdding[index][randomIndex].toUpperCase();
          }
          return;   
      }
    });
        
    if (correctString.length > length) { 
      const lettersToRemove = correctString.length - length;

      for (let i = 0; i < lettersToRemove; i++) {
        correctString = correctString.replace(/\p{Ll}/u, '');
      }
    }

    if (correctString.length < length) { 
      const lettersToAdd = length - correctString.length;

      for (let i = 0; i < lettersToAdd; i++) {
        const randomLetterIndex =
          Math.floor(Math.random() * lettersList.length);

        correctString += lettersList[randomLetterIndex];
      }
    }

    if (randomizeOutput) {
      return randomize(correctString);
    }
      
    return correctString;
    
  } // end of if (isInvalidStringCheck) {...}

  if (randomizeOutput) {
    return randomize(correctString);
  }

  return correctString;
}

/**
 * 
 * @param {array} options 
 * @returns {*}
 */
function returnRandom(options) {
  const isArray = Array.isArray(options);
      
  if (!isArray) {
    throw new Error('"options" must be an Array');
  } else if (options.length < 2) {
    throw new Error('"options" must have at least two elements');
  }

  const whichToReturn = Math.floor(Math.random() * options.length);

  return options[whichToReturn];
}

export {
  ArgumentError,
  isTheSameStructureOfObj,
  randomize,
  stringTransformator,
  returnRandom,
};