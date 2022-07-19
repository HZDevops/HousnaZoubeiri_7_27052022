/**
 * Return a boolean if matching text 
 * @param {String} string
 * @param {String} stringToBeMatched - value of recipe name, ingredient or description
 * @returns {Boolean}
 **/
export function includes(string, stringToBeMatched) {
  let match = 0;
  for (let j = 0; j < stringToBeMatched.length; j++) {
    if (stringToBeMatched[j] === string[0]) {
      for (let k = 0; k < string.length; k++) {
        if (string[k] === stringToBeMatched[k + j]) {
          match++;
        }
      }
      if (match === string.length) {
        return true;
      }
      match = 0;
    }
  }
  return false;
}
