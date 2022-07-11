import { getRecipes } from './utils/getData.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { selectIngredient } from './components/selectIngredient.js';
import { selectAppliance } from './components/selectAppliance.js';
import { selectUstensil } from './components/selectUstensil.js';
import { searchRecipe } from './utils/searchRecipe.js';


//DOM elements
let inputRecipe = document.getElementById('floatingInput')
let recipeContainer = document.querySelector('.recipe-container')

let recipesArray = [];

/**
 * Display recipe by input in main search bar
 **/
export function inputRecipeListner() {
  
  let searchedRecipes = [];
  inputRecipe.addEventListener('keyup', function (e) {
        
    if (inputRecipe.value.length < 3) {
      searchedRecipes = recipesArray
      displayRecipes(searchedRecipes)
    }
    
    if (inputRecipe.value.length >= 3) {
      searchedRecipes = searchRecipe(searchedRecipes, inputRecipe.value);
    
      recipeContainer.innerHTML = '';
      displayRecipes(searchedRecipes);
      selectIngredient(searchedRecipes);
      selectAppliance(searchedRecipes);
      selectUstensil(searchedRecipes);
    }
  })
  
}

recipesArray = await getRecipes()
displayRecipes(recipesArray)
inputRecipeListner()
//searchedRecipes = recipesArray;
//searchByTag(searchedRecipes);
selectIngredient(recipesArray);
selectAppliance(recipesArray);
selectUstensil(recipesArray);



