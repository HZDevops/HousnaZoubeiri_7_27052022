import { getData } from './utils/getData.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { selectAppliance } from './components/selectAppliance.js';
import { selectUstensil } from './components/selectUstensil.js';
import { selectIngredient } from './components/selectIngredient.js';
import {  searchRecipe, searchByUstensil, searchByAppliance, searchByIngredient } from './utils/searchRecipe.js';



//DOM elements
let inputRecipe = document.getElementById('floatingInput')
let recipeContainer = document.querySelector('.recipe-container')

let recipesArray = [];


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
export function inputRecipeListner() {
  inputRecipe.addEventListener('keyup', function (e) {
    let searchedRecipes = [];

    if (inputRecipe.value.length < 3) {
      searchedRecipes = recipesArray
      //console.log(searchedRecipes)
      displayRecipes(searchedRecipes)
    }
    
    if (inputRecipe.value.length >= 3) {
      searchedRecipes = searchRecipe(recipesArray, inputRecipe.value);
      recipeContainer.innerHTML = ''
      displayRecipes(searchedRecipes)
    }
  })
}

await loadRecipes()
displayRecipes(recipesArray)
inputRecipeListner()
selectAppliance(recipesArray)
selectUstensil(recipesArray)
selectIngredient(recipesArray)


