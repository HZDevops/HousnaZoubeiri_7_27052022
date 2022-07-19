import { getIngredientList } from '../utils/getIngredientList.js';
import { inputRecipeListner } from '../index.js';
import { searchByIngredient } from '../components/searchRecipe.js';
import { displayRecipes } from '../components/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';
import { selectAppliance } from './selectAppliance.js';
import { selectUstensil } from './selectUstensil.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const ingredientInput = document.getElementById('ingredient-input');
const ingredientLabel = document.getElementById('ingredient-label');
const ingredientItems = document.querySelector('.ingredient-list');
const arrowUp = document.querySelector('.ingredient-chevron');

let tagContainer = document.querySelector('.tag-container');
let ingredientTag = `<button type="button" class="btn ingredient-tag"><span class="ingredient-name tag"></span><i class="bi bi-x-circle ingredient-close"></i></div>`;
const allRecipes = await getRecipes();

ingredientInput.style.display = 'none';
arrowUp.style.display = 'none';


/**
 * Create ingredient tag in tag section
 * @param {String} ingredientValue
 */
function createIngredientTag(ingredientValue) {
  tagContainer.insertAdjacentHTML('beforeend', ingredientTag);
  
  let ingredientName = document.querySelector('.ingredient-name');
  ingredientName.innerHTML = ingredientValue;
}

/**
 * Update ingredient tag in tag section
 * @param {String} ingredientValue
 */
function updateIngredientTag(ingredientValue) {
  let ingredient = document.querySelector('.ingredient-name');

  ingredient.innerHTML = ingredientValue;
}

/**
 * Remove tag in tag section when click in cross icon
 * @param {Array} recipes
 */
async function closeIngredientTag() {
  const tag = document.querySelector('.ingredient-tag');
  const closeTag = document.querySelector('.ingredient-close');

  closeTag.addEventListener('click', function (e) {
    tag.remove();
    recipeContainer.innerHTML = '';
    displayRecipes(allRecipes);
    inputRecipeListner();
  });
}

/**
 * Display selected ingredient tag in tag section and searched recipes by ingredient
 * @param {Array} ingredients
 * @param {Array} recipes
 */
function displayIngredientTag(ingredients, recipes) {

  ingredients.forEach((ingredient) => {
    ingredient.addEventListener('click', (e) => {
      let ingredientSelected = ingredient.textContent;
      let currentIngredientTag =  document.querySelector('.ingredient-tag');
      
      ingredientItems.style.display = 'none';
      ingredientInput.style.display = 'none';
      ingredientLabel.style.display = 'block';
           
      if (!currentIngredientTag) {
        createIngredientTag(ingredientSelected);
        closeIngredientTag();
       
        let searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        selectAppliance(searchedRecipeByIngredient);
        selectUstensil(searchedRecipeByIngredient);
             
      } else {
        updateIngredientTag(ingredientSelected);
        closeIngredientTag();
        let searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        selectAppliance(searchedRecipeByIngredient);
        selectUstensil(searchedRecipeByIngredient);
      }
    });
  });
}

/**
 * Select ingredient tag in dropdown menu
 * @param {Array} recipes
 */
export function selectIngredient(recipes) {
  const ingredientList = getIngredientList(allRecipes);

  for (let i = 0; i < ingredientList.length; i++) {
    ingredientItems.insertAdjacentHTML(
      'beforeend',
      `<li class="dropdown-item ingredient-item">${ingredientList[i]}</li>`
    );
  }

  ingredientLabel.addEventListener('click', function (e) {
    ingredientInput.style.display = 'block';
    ingredientInput.style.width = '667px'
    arrowUp.style.display = 'block';
    ingredientLabel.style.display = 'none';
    ingredientItems.style.display = 'flex';

    let ingredientsFromDropdownMenu = Array.from(
      document.getElementsByClassName('ingredient-item')
    );

    displayIngredientTag(ingredientsFromDropdownMenu, recipes);
    
    ingredientInput.addEventListener('keyup', function (e) {
      let input = e.target.value.toLowerCase();
      
      let newIngredientArray = ingredientList.filter(
        (ingredient) => ingredient.toLowerCase().includes(input)
      );

      ingredientItems.innerHTML = '';

      for (let i = 0; i < newIngredientArray.length; i++) {
        ingredientItems.insertAdjacentHTML(
          'beforeend',
          `<li class="dropdown-item ingredient-item">${newIngredientArray[i]}</li>`
        );
      }
      ingredientsFromDropdownMenu = Array.from(
        document.getElementsByClassName('ingredient-item')
      );
      displayIngredientTag(ingredientsFromDropdownMenu, recipes);
    });

    if(arrowUp) {
      arrowUp.addEventListener('click', function (e) {
          ingredientInput.style.display = 'none';
          ingredientItems.style.display = 'none';
          arrowUp.style.display = 'none';
          ingredientLabel.style.display = 'block';
        });
    } 
  });
}
