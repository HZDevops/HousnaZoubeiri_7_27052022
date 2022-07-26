/**
 * Get ustensils list in an array
 * @param {Array} recipes
 * @returns {Array}
 */
export function getUstensilList(recipes) {
  let ustensilArray = [];
  recipes.forEach((recipe) => {
    let array = recipe.ustensils;

    for (let i = 0; i < array.length; i++) {
      ustensilArray.push(array[i]);
    }
  });
  //Remove duplicated elements in ustensilArray
  ustensilArray = [...new Set(ustensilArray)];
  return ustensilArray;
}
