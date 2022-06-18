/**
 * Return an array with recipes matching withn a string
 * @param {Array} recipes
 * @param {string} string
 * @returns {Array} 
 **/

export function searchRecipe(recipes, string) {
  let searchedRecipes = []

  recipes.forEach((recipe) => {
    let stringSearched = recipe.name.toLowerCase()
    
    if (stringSearched.includes(string) === true) {
      searchedRecipes.push(recipe);
    }
  })

  return searchedRecipes
}
