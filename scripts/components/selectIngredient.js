import { getIngredientList } from '../utils/getIngredientList.js';
import { searchByIngredient } from '../utils/searchRecipe.js';
import { inputRecipeListner } from '../index.js';
import { displayRecipes } from '../utils/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const ingredientInput = document.getElementById('ingredient-input');
const ingredientLabel = document.getElementById('ingredient-label');
const ingredientItems = document.querySelector('.ingredient-items');
const arrowUp = document.querySelector('.bi-chevron-up');

let tagContainer = document.querySelector('.tag-container');

let ingredientTag = '';

ingredientInput.style.display = 'none';
arrowUp.style.display = 'none';


/**
 * Create ingredient tag in tag section
 */
function createIngredientTag() {
  console.log('bonjour')
  ingredientTag = `<button type="button" class="btn ingredient-tag"><span class="ingredient-name tag"></span><i class="bi bi-x-circle"></i></div>`;
  tagContainer.innerHTML = ingredientTag;
}

/**
 * Update ingredient tag in tag section
 * @param {Array} textContent
 */
function updateSelectedTag(textContent) {
  let ingredient = document.querySelector('.ingredient-name');
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
async function closeIngredientTag(recipes) {
  const tag = document.querySelector('.ingredient-tag');
  const closeTag = document.querySelector('.bi-x-circle');
  const recipesData = await getRecipes();
  console.log(recipesData)

  closeTag.addEventListener('click', function (e) {
    tag.remove();
    recipeContainer.innerHTML = '';
    displayRecipes(recipesData);
    inputRecipeListner();
  });
}

/**
 * Display selected ingredient tag in tag section and searched recipes by ingredient
 * @param {Array} ingredients
 * @param {Array} recipes
 */
function displayIngredientTag(ingredients, recipes) {
  //console.log(recipes)
  ingredients.forEach((ingredient) => {
    ingredient.addEventListener('click', (e) => {
      ingredientItems.style.display = 'none';
      ingredientInput.style.display = 'none';
      ingredientLabel.style.display = 'block';
      let ingredientSelected = ingredient.textContent;

      if (!ingredientTag) {
        createIngredientTag();
        closeIngredientTag(recipes);
        updateSelectedTag(ingredientSelected);

        let searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredient.textContent
        );
        recipeContainer.innerHTML = '';
        //console.log(searchedRecipeByIngredient);
        displayRecipes(searchedRecipeByIngredient);
      } else {
        updateSelectedTag(ingredientSelected);
        closeIngredientTag(recipes);
        
        let searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredient.textContent
        );
        recipeContainer.innerHTML = '';
        //console.log(searchedRecipeByIngredient);
        displayRecipes(searchedRecipeByIngredient);
      }
    });
  });
}

/**
 * Select ingredient tag in dropdown menu
 * @param {Array} recipes
 */
export function selectIngredient(recipes, searchedRecipesInMainInput) {
  //console.log(recipes, searchedRecipesInMainInput)
  const ingredientArray = getIngredientList(recipes);

  for (let i = 0; i < ingredientArray.length; i++) {
    ingredientItems.insertAdjacentHTML(
      'beforeend',
      `<li class="dropdown-item">${ingredientArray[i]}</li>`
    );
  }

  ingredientLabel.addEventListener('click', function (e) {
    ingredientInput.style.display = 'block';
    ingredientInput.style.width = '667px'
    arrowUp.style.display = 'block';
    ingredientLabel.style.display = 'none';
    ingredientItems.style.display = 'flex';

    let ingredients = Array.from(
      document.getElementsByClassName('dropdown-item')
    );

    displayIngredientTag(ingredients, searchedRecipesInMainInput);

    ingredientInput.addEventListener('keyup', function (e) {
      let input = e.target.value.toLowerCase();
      let newIngredientArray = ingredientArray.filter((ingredient) =>
        ingredient.toLowerCase().includes(input)
      );

      ingredientItems.innerHTML = '';

      for (let i = 0; i < newIngredientArray.length; i++) {
        ingredientItems.insertAdjacentHTML(
          'beforeend',
          `<li class="dropdown-item">${newIngredientArray[i]}</li>`
        );
      }
      ingredients = Array.from(document.getElementsByClassName('dropdown-item'));

      displayIngredientTag(ingredients, searchedRecipesInMainInput);
    });

    if(arrowUp) {
      arrowUp.addEventListener('click', (event) => {
        ingredientInput.style.display = 'none';
        ingredientItems.style.display ='none';
        arrowUp.style.display = 'none';
        ingredientLabel.style.display = 'block';
      });
    } 
  });
    
}
