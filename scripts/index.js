import { getRecipes } from './utils/getData.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { selectIngredient } from './components/selectIngredient.js';
import { selectAppliance } from './components/selectAppliance.js';
import { selectUstensil } from './components/selectUstensil.js';
import { searchRecipe, searchByUstensil, searchByAppliance, searchByIngredient } from './utils/searchRecipe.js';


//DOM elements
let inputRecipe = document.getElementById('floatingInput')
let recipeContainer = document.querySelector('.recipe-container')

let recipesArray = [];
let searchedRecipes = [];

/**
 * Display recipe by input in main search bar
 **/
export function inputRecipeListner() {
  
  inputRecipe.addEventListener('keyup', function (e) {
    if (inputRecipe.value.length < 3) {
      searchedRecipes = recipesArray
      displayRecipes(searchedRecipes)
    }
    
    if (inputRecipe.value.length >= 3) {
      searchedRecipes = searchRecipe(searchedRecipes, inputRecipe.value);
      //console.log(searchedRecipes);
      recipeContainer.innerHTML = '';
      displayRecipes(searchedRecipes);
      selectIngredient(recipesArray, searchedRecipes);
      selectAppliance(recipesArray, searchedRecipes);
    }
  })
  
}

recipesArray = await getRecipes()
//console.log(recipesArray)
displayRecipes(recipesArray)
inputRecipeListner()
//console.log(recipes);
//selectIngredient(recipesArray, searchedRecipes);
//selectAppliance(recipesArray)
//selectUstensil(recipesArray)



