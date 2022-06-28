/**
 * Get appliances list
 * @param {Array} recipes
 * @returns {Array}
 */ 
export function getApplianceList(recipes) {
  const applianceArray = [];
  recipes.forEach((recipe) => {
    applianceArray.push(recipe.appliance);
  });
  return applianceArray;
}
