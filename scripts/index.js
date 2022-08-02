import { getRecipes } from './utils/getData.js';
import { createItemTagList } from './utils/createItemTagList.js';
import { displayRecipes } from './components/displayRecipes.js';
import { searchRecipe } from './components/searchRecipe.js';
import { selectTag } from './components/searchByTag.js';


//DOM elements
let inputRecipe = document.getElementById('floatingInput');
let recipeContainer = document.querySelector('.recipe-container');

let recipesArray = [];

/**
 * Display recipe by input in main search bar
 **/
export function inputRecipeListner() {
  let searchedRecipes = [];
  inputRecipe.value = '';
  
  inputRecipe.addEventListener('keyup', () => {

    if (inputRecipe.value.length < 3) {
      recipeContainer.innerHTML = '';
      searchedRecipes = recipesArray;
      displayRecipes(searchedRecipes);
      createItemTagList(searchedRecipes);
    }

    if (inputRecipe.value.length >= 3) {
      searchedRecipes = searchRecipe(searchedRecipes, inputRecipe.value);
      if (searchedRecipes.length === 0) {
        const recipeInfo = `<p id="recipe-info">
          Aucune recette ne correspond à votre critère… vous pouvez chercher «
          tarte aux pommes », « poisson », etc.</p>`;
        recipeContainer.innerHTML = recipeInfo;
      } else {
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipes);
        createItemTagList(searchedRecipes);
      }
    }
  })
}

recipesArray = await getRecipes();
displayRecipes(recipesArray);
inputRecipeListner();
selectTag(recipesArray);




