/**
 * Get ingredients array
 * @param {Array} recipes
 * @returns {Array}
 */ 
export function getIngredientList(recipes) {
  const ingredientArray = [];
  
  recipes.forEach((recipe) => {
    let array = recipe.ingredients
    for (let i = 0; i < array.length; i++) {
      ingredientArray.push(array[i].ingredient);
    }
  });
  return (ingredientArray);
}
