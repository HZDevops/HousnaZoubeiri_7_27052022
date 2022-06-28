//Get appliances list
export function getApplianceList(recipes) {
  const applianceArray = [];
  recipes.forEach((recipe) => {
    applianceArray.push(recipe.appliance)
  });
  return applianceArray

}

