/**
 * Get appliances array
 * @param {Array} recipes
 * @returns {Array}
 */ 
export function getApplianceList(recipes) {
  let applianceArray = [];
  recipes.forEach((recipe) => {
    applianceArray.push(recipe.appliance);
  });

  applianceArray = applianceArray.filter((ele, pos) => applianceArray.indexOf(ele) === pos
  );
  return applianceArray;
}
