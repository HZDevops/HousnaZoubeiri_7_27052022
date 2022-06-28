
/**
 * Return an array with recipes matching with input string in search bar
 * @param {Array} recipes
 * @param {string} string
 * @returns {Array} 
 **/

export function searchRecipe(recipes, string) {
  let searchedRecipes = []

  recipes.forEach((recipe) => {
    let stringSearched = recipe.name.toLowerCase()
    
    if (stringSearched.includes(string) === true) {
      searchedRecipes.push(recipe)
    }
  })

  return searchedRecipes
}

/**
 * Return an array with recipes matching with ustensil tag
 * @param {Array} recipes
 * @param {String} string - value of ustensil
 * @returns {Array} 
 **/
export function searchByUstensil(recipes, ustensil) {
    let searchedRecipes = []

    recipes.forEach ((recipe) => {
        let ustensilSearched  = recipe.ustensils
        //console.log(ustensilSearched)
        if (ustensilSearched.filter((element) => element.includes(ustensil)).length > 0 ) {
           searchedRecipes.push(recipe)
        }
    })  
    //console.log (searchedRecipes)
}

/**
 * Return an array with recipes matching with appliance tag
 * @param {Array} recipes
 * @param {String} string - value of appliance
 * @returns {Array} 
 **/
export function searchByAppliance(recipes, appliance) {
  console.log(recipes, appliance)
  let searchedRecipes = [];
  recipes.forEach((recipe) => {
    let applianceSearched = recipe.appliance.toLowerCase()

    if (applianceSearched.includes(appliance.toLowerCase()) === true) {
      searchedRecipes.push(recipe);
    }
  })
  return searchedRecipes
}

/**
 * Return an array with recipes matching with ingredient tag
 * @param {Array} recipes
 * @param {Array} ingredients
 * @returns {Array} 
 */
 export function searchByIngredient(recipes, ingredientFound) {
    let searchedRecipes = [];
    let ingredientsArray = [];
    
    //console.log(recipes)
    recipes.forEach((recipe) => {
        ingredientsArray = recipe.ingredients
        ingredientsArray.forEach ((element, index, array) => {
            if (element.ingredient.includes(ingredientFound)) {
                searchedRecipes.push(recipe);
                index ++;
                array.length ++;
            }
        })
    })
        

    //console.log(searchedRecipes)
}
