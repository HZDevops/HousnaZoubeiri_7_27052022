import { getIngredientList } from '../utils/getIngredientList.js';
import { searchByIngredient } from '../utils/searchRecipe.js';
import { displayRecipes } from '../utils/displayRecipes.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const ingredientInput = document.getElementById('ingredient-input');
const ingredientLabel = document.getElementById('ingredient-label');
const ingredientItems = document.querySelector('.ingredient-items');
let tagContainer = document.querySelector('.tag-container');

let ingredientTag = '';
let ingredientArray = [];

ingredientInput.style.display = 'none';

/**
 * Create ingredient tag in tag section
 */
function createIngredientTag() {
  ingredientTag = `<button type="button" class="btn ingredient-tag"><span class="ingredient-name tag"></span><i class="bi bi-x-circle"></i></div>`;
  tagContainer.innerHTML = ingredientTag;
}

/**
 * Update ingredient tag in tag section
 * @param {Array} textContent
 */
function updateSelectedTag(textContent) {
  let ingredient = document.querySelector('.appliance-name');
  if (!ingredient) {
    createIngredientTag();
  } else {
    ingredient.innerHTML = textContent;
  }
}

/**
 * Remove tag in tag section when click in cross icon
 * @param {Array} recipes
 */
function closeIngredientTag(recipes) {
  const tag = document.querySelector('.ingredient-tag');
  const closeTag = document.querySelector('.bi-x-circle');

  closeTag.addEventListener('click', function (e) {
    tag.remove();
    displayRecipes(recipes);
  });
}

/**
 * Display selected ingredient tag in tag section and searched recipes by ingredient
 * @param {Array} ingredients
 * @param {Array} recipes
 */
function displayIngredient(ingredients, recipes) {
  ingredients.forEach((ingredient) => {
    ingredient.addEventListener('click', (e) => {
      ingredientItems.style.display = 'none';
      ingredientInput.style.display = 'none';
      ingredientLabel.style.display = 'block';
      let ingredientSelected = ingredient.textContent;

      if (ingredientTag) {
        updateSelectedTag(ingredientSelected);
        closeIngredientTag(recipes);

        let searchedRecipe = searchByIngredient(
          recipes,
          ingredient.textContent
        );
        recipeContainer.innerHTML = '';
        console.log(searchedRecipe);
        displayRecipes(searchedRecipe);
      } else {
        createIngredientTag();
        closeIngredientTag(recipes);
        updateSelectedTag(ingredientSelected);

        let searchedRecipe = searchByIngredient(
          recipes,
          ingredient.textContent
        );
        recipeContainer.innerHTML = '';
        console.log(searchedRecipe);
        displayRecipes(searchedRecipe);
      }
    });
  });
}

/**
 * Select ingredient tag in dropdown menu
 * @param {Array} recipes
 */
export function selectIngredient(recipes) {
  const ingredientArray = getIngredientList(recipes);

  for (let i = 0; i < ingredientArray.length; i++) {
    ingredientItems.insertAdjacentHTML(
      'beforeend',
      `<li><a class="dropdown-item" href="#">${ingredientArray[i]}</a></li>`
    );
  }

  ingredientLabel.addEventListener('click', function (e) {
    ingredientInput.style.display = 'block';
    ingredientLabel.style.display = 'none';
    ingredientItems.style.display = 'block';

    let ingredients = Array.from(
      document.getElementsByClassName('dropdown-item')
    );

    displayIngredientTag(ingredients, recipes);

    ingredientInput.addEventListener('keyup', function (e) {
      let input = e.target.value.toLowerCase();
      let newIngredientArray = ingredientArray.filter((ingredient) =>
        ingredient.toLowerCase().includes(input)
      );

      ingredientItems.innerHTML = '';

      for (let i = 0; i < newIngredientArray.length; i++) {
        ingredientItems.insertAdjacentHTML(
          'beforeend',
          `<li><a class="dropdown-item" href="#">${newIngredientArray[i]}</a></li>`
        );
      }
      ingredients = Array.from(document.getElementsByClassName('dropdown-item'));

      displayIngredientTag(ingredients, recipes);
    });
  });
  /*window.addEventListener('click', function(e){
    applianceItems.style.display = 'none';
    applianceInput.style.display = 'none';
    applianceLabel.style.display = 'block';
  })*/
}
