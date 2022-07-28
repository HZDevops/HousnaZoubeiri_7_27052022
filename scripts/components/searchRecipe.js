import { includes } from '../utils/includesFunction.js';

/**
 * Return an array with recipes matching with input string in search bar
 * @param {Array} recipes
 * @param {string} string - value of recipe name, ingredient ou description
 * @returns {Array} 
 **/

export function searchRecipe(recipes, string) {
  let searchedRecipes = [];

  for ( let i = 0; i < recipes.length ; i++) {
    let nameRecipeSearched = recipes[i].name.toLowerCase();
    let ingredientRecipeSearched = recipes[i].ingredients;
    let descriptionRecipeSearched = recipes[i].description.toLowerCase();
    
    if (includes (string, nameRecipeSearched) === true) {
      searchedRecipes.push(recipes[i]);
    }
    for (let j = 0; j < ingredientRecipeSearched.length; j++) {
      if (includes(string, ingredientRecipeSearched[j].ingredient.toLowerCase()) === true) {
        searchedRecipes.push(recipes[i]);
      } 
    }
    if (includes (string, descriptionRecipeSearched) === true) {
      searchedRecipes.push(recipes[i]);
    }
  }
  let newSearchedRecipes = [...new Set(searchedRecipes)];
  return newSearchedRecipes;
}

/**
 * Return an array with recipes matching with ingredient tag
 * @param {Array} recipes
 * @param {String} ingredient - value of ingredient
 * @returns {Array} 
 */
 export function searchByIngredient(recipes, ingredient) {
  console.log(recipes)
  let searchedRecipes = [];
  let ingredientsArray = [];
    
  recipes.forEach((recipe) => {
    ingredientsArray = recipe.ingredients
    
    ingredientsArray.forEach ((element) => {
      if (element.ingredient.includes(ingredient)) {
        searchedRecipes.push(recipe);
      }
    })
  })
  return searchedRecipes;
}

/**
 * Return an array with recipes matching with appliance tag
 * @param {Array} recipes
 * @param {String} string - value of appliance
 * @returns {Array} 
 **/
export function searchByAppliance(recipes, appliance) {
  let searchedRecipes = [];
  recipes.forEach((recipe) => {
    let applianceSearched = recipe.appliance.toLowerCase()

    if (applianceSearched.includes(appliance.toLowerCase()) === true) {
      searchedRecipes.push(recipe);
    }
  })
  return searchedRecipes;
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
  return (searchedRecipes);
}


