/**
 * Get ustensils list
 * @param {Array} recipes
 * @returns {Array}
 */
export function getUstensilList(recipes) {
  const ustensilArray = [];
  recipes.forEach((recipe) => {
    ustensilArray.push(recipe.ustensils);
  });
  return ustensilArray;
}
