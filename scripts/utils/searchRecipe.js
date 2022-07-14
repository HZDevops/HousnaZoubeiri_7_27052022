
/**
 * Return an array with recipes matching with input string in search bar
 * @param {Array} recipes
 * @param {string} string - value of recipe name, ingredient ou description
 * @returns {Array} 
 **/

export function searchRecipe(recipes, string) {
  //console.log(recipes)
  let searchedRecipes = [];
  recipes.forEach((recipe) => {
    let nameRecipeSearched = recipe.name.toLowerCase();
    let ingredientRecipeSearched = recipe.ingredients;
    let descriptionRecipeSearched = recipe.description.toLowerCase();
    
    if (nameRecipeSearched.includes(string) === true) {
      searchedRecipes.push(recipe);
    }
    for (let i = 0; i < ingredientRecipeSearched.length; i++) {
      if ((ingredientRecipeSearched[i].ingredient.toLowerCase()).includes(string) === true) {
        searchedRecipes.push(recipe);
      } 
    }
    if (descriptionRecipeSearched.includes(string) === true) {
      searchedRecipes.push(recipe);
    }
  })
  let FilteredSearchedRecipes = [...new Set(searchedRecipes)];
  return FilteredSearchedRecipes;
}

/**
 * Return an array with recipes matching with ustensil tag
 * @param {Array} recipes
 * @param {String} string - value of ustensil
 * @returns {Array} 
 **/
export function searchByUstensil(recipes, ustensil) {
  let searchedRecipes = [];
  recipes.forEach ((recipe) => {
    let ustensilSearched  = recipe.ustensils;
        
    for (let i = 0; i < ustensilSearched.length; i++) {
      let element = ustensilSearched[i].toLowerCase();
          
      if (element.includes(ustensil.toLowerCase()) === true) {
        searchedRecipes.push(recipe);
      }
    }
  })  
  return (searchedRecipes)
}

/**
 * Return an array with recipes matching with appliance tag
 * @param {Array} recipes
 * @param {String} string - value of appliance
 * @returns {Array} 
 **/
export function searchByAppliance(recipes, appliance) {
  //console.log(recipes, appliance)
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
 * @param {String} ingredient - value of ingredient
 * @returns {Array} 
 */
 export function searchByIngredient(recipes, ingredient) {
  //console.log(recipes)
  let searchedRecipes = [];
  let ingredientsArray = [];
    
  recipes.forEach((recipe) => {
    ingredientsArray = recipe.ingredients
    const length = ingredientsArray.length;

    ingredientsArray.forEach ((element, index, array) => {
      if (element.ingredient.includes(ingredient)) {
        searchedRecipes.push(recipe);
        index ++;
        array.length ++;
      }
    })
    if (length != ingredientsArray.length) {
      ingredientsArray.length --;
    }
  })
       
  return searchedRecipes;
}
