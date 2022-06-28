import { getData } from './utils/getData.js';
import { recipeFactory } from './factories/recipe.js';
import { selectAppliance } from './components/selectAppliance.js'
import {  searchRecipe, searchByUstensil, searchByAppliance, searchByIngredient } from './utils/searchRecipe.js';


//DOM elements
let inputRecipe = document.getElementById('floatingInput')
let recipeContainer = document.querySelector('.recipe-container')

let recipesArray = []


/**
 * Import recipes database in a array
 * @returns {Array} 
 **/
async function loadRecipes() {
  const data = await getData()
  recipesArray = data.recipes
}

/**
 * Display recipe cards matched with input in search bar
 * @param {Array} recipes
 **/
function displayRecipes(recipes) {
  const recipeContainer = document.querySelector('.recipe-container')
 
  for (let i= 0; i < recipes.length; i ++) {
    const recipeModel = recipeFactory(recipes[i])
    const recipeCard = recipeModel.getRecipeCardDOM()
    const ingredientList = recipeModel.displayIngredientList()
    recipeContainer.appendChild(recipeCard.card)
   
    //Insert every ingredient in the recipe card
    for (let j=0; j<ingredientList.length; j++) {
      let recipeIngredient = document.getElementById(`${recipeCard.id}`)
      recipeIngredient.appendChild(ingredientList[j]);
    }
  }
}

function inputRecipeListner() {
  inputRecipe.addEventListener('keyup', function (e) {
    if (inputRecipe.value.length < 3) {
      searchedRecipes = recipesArray
      //console.log(searchedRecipes)
      displayRecipes(searchedRecipes)
    }
    //console.log(inputRecipe.value.length, inputRecipe.value)
    if (inputRecipe.value.length >= 3) {
      searchedRecipes = searchRecipe(searchedRecipes, inputRecipe.value);
      recipeContainer.innerHTML = ''
      //console.log(searchedRecipes)
      displayRecipes(searchedRecipes)
    }
  })
}

await loadRecipes()

displayRecipes(recipesArray)

let searchedRecipes = recipesArray

inputRecipeListner()
selectAppliance(recipesArray)
searchByUstensil(recipesArray, 'saladier')
searchByAppliance(recipesArray, 'blender')
searchByIngredient(recipesArray, 'lait')

//searchByIngredients(recipesArray, 'coco')

