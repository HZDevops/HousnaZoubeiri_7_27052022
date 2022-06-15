import { getData } from './utils/getData.js'
import { recipeFactory } from './factories/recipe.js'

let recipesArray = []

//Import recipes database in a array
async function loadRecipes() {
  const data = await getData()
  recipesArray = data.recipes
}

//Display recipes
function displayRecipes(recipes) {
  const recipeContainer = document.querySelector('.recipe-container')

  for (let i= 0; i < recipes.length; i ++) {
    const recipeModel = recipeFactory(recipes[i])
    const recipeCard = recipeModel.getRecipeCardDOM()
    recipeContainer.appendChild(recipeCard)
  }
}

await loadRecipes()
displayRecipes(recipesArray)
