import { recipeFactory } from '../factories/recipe.js';

/**
 * Display recipe cards
 * @param {Array} recipes
 **/
export function displayRecipes(recipes) {
  const recipeContainer = document.querySelector('.recipe-container');
  //console.log(recipes)
  for (let i = 0; i < recipes.length; i++) {
    const recipeModel = recipeFactory(recipes[i]);
    const recipeCard = recipeModel.getRecipeCardDOM();
    const ingredientList = recipeModel.displayIngredientList();
    recipeContainer.appendChild(recipeCard.card);

    //Insert every ingredient in the recipe card
    for (let j = 0; j < ingredientList.length; j++) {
      let recipeIngredient = document.getElementById(`${recipeCard.id}`);
      recipeIngredient.appendChild(ingredientList[j]);
    }
  }
}
