/**
 * Get ingredients array
 * @param {Array} recipes
 * @returns {Array}
 */ 
export function getIngredientList(recipes) {
  let ingredientArray = [];
  
  recipes.forEach((recipe) => {
    let array = recipe.ingredients;
    for (let i = 0; i < array.length; i++) {
      ingredientArray.push(array[i].ingredient);
    }
    ingredientArray = ingredientArray.filter(
      (ele, pos) => ingredientArray.indexOf(ele) === pos
    );
  });
  return (ingredientArray);
}
