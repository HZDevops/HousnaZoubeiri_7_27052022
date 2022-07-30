/**
 * Get appliances in an array
 * @param {Array} recipes
 * @returns {Array}
 */
export function getApplianceList(recipes) {
  let applianceArray = [];
  recipes.forEach((recipe) => {
    applianceArray.push(recipe.appliance);
  });
  //Remove duplicated elements in applianceArray
  applianceArray = [...new Set(applianceArray)];
  return applianceArray;
}
