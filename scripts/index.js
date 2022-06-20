import { getData } from './utils/getData.js'
import { recipeFactory } from './factories/recipe.js'
import { searchRecipe } from './utils/searchRecipe.js'

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
    const ingredientList = recipeModel.getIngredientList()
    
    recipeContainer.appendChild(recipeCard.card)
   
    for (let j=0; j<ingredientList.length; j++) {
      let recipeIngredient = document.getElementById(`${recipeCard.id}`)
      recipeIngredient.appendChild(ingredientList[j]);
    }
  }
}

await loadRecipes()
console.log(recipesArray)
displayRecipes(recipesArray)
let inputRecipe = document.getElementById('floatingInput')
let input = ''
let searchedRecipes = recipesArray

inputRecipe.addEventListener('keyup', function(e) {
  console.log(inputRecipe.value.length, inputRecipe.value)
 if (inputRecipe.value.length >= 3) {
   searchedRecipes = searchRecipe(searchedRecipes, inputRecipe.value);
  console.log(searchedRecipes);
  }
})

