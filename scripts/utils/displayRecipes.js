import { recipeFactory } from '../factories/recipe.js';

/**
 * Display recipe cards
 * @param {Array} recipes
 **/
export function displayRecipes(recipes) {
  const recipeContainer = document.querySelector('.recipe-container');
  //console.log('bonjour');
  console.log(recipes)
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeCard = recipeModel.getRecipeCardDOM();
    const ingredientList = recipeModel.createIngredientList();
    
    recipeContainer.appendChild(recipeCard.card);

    let recipeIngredients = document.getElementById(`${recipeCard.id}`);
    recipeIngredients.innerHTML = '';
    
    //Insert every ingredient in the recipe card
    for (let j = 0; j < ingredientList.length; j++) {
      recipeIngredients.appendChild(ingredientList[j]);
    }
  })
  return recipes;
}
