import { getData } from './utils/getData.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { selectAppliance } from './components/selectAppliance.js';
import { selectUstensil } from './components/selectUstensil.js';
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
 * Display recipe by input in main search bar
 **/
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
selectUstensil(recipesArray)
//searchByUstensil(recipesArray, 'saladier')
//searchByAppliance(recipesArray, 'blender')
searchByIngredient(recipesArray, 'lait')

//searchByIngredients(recipesArray, 'coco')

