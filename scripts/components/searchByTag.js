import { getIngredientList } from '../utils/getIngredientList.js';
import { getApplianceList } from '../utils/getApplianceList.js';

import { inputRecipeListner } from '../index.js';
//import { searchByIngredient } from '../components/searchRecipe.js';
import { displayRecipes } from '../components/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
let tagContainer = document.querySelector('.tag-container');

//DOM elements for ingredient tag
const ingredientInput = document.getElementById('ingredient-input');
const ingredientLabel = document.getElementById('ingredient-label');
const ingredientItems = document.querySelector('.ingredient-list');
const arrowUpIngredient = document.querySelector('.ingredient-chevron');

//DOM elements for appliance tag
const applianceInput = document.getElementById('appliance-input');
const applianceLabel = document.getElementById('appliance-label');
const applianceItems = document.querySelector('.appliance-list');
const arrowUpAppliance = document.querySelector('.appliance-chevron');

const allRecipes = await getRecipes();

ingredientInput.style.display = 'none';
applianceInput.style.display = 'none';
arrowUpIngredient.style.display = 'none';
arrowUpAppliance.style.display = 'none';


/**
 * Create ingredient tag in tag section
 * @param {Element} tagElement
 * @param {String} ingredientValue
 */
function createIngredientTag(ingredientValue) {
  let ingredientTag = `<button type="button" class="btn ingredient-tag"><span class="ingredient-name tag"></span><i class="bi bi-x-circle ingredient-close"></i></div>`;
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

function createApplianceTag(tagValue) {
  let applianceTag = `<button type="button" class="btn appliance-tag"><span class="appliance-name tag"></span><i class="bi bi-x-circle appliance-close"></i></div>`;
  tagContainer.insertAdjacentHTML('beforeend', applianceTag);
  let applianceName = document.querySelector('.appliance-name');
  
  applianceName.innerHTML = tagValue;
}

/**
 * Update appliance tag in tag section
 * @param {String} applianceValue
 */
function updateApplianceTag(applianceValue) {
  let appliance = document.querySelector('.appliance-name');

  appliance.innerHTML = applianceValue;
}

/**
 * Remove tag in tag section when click in cross icon
 */
async function closeTag() {
  const tagIngredient = document.querySelector('.ingredient-tag');
  const tagAppliance = document.querySelector('.appliance-tag');
  let closeIngredientTag = document.querySelector('.ingredient-close');
  let closeApplianceTag = document.querySelector('.appliance-close');

  if (closeIngredientTag) {
    closeIngredientTag.addEventListener('click', () => {
      tagIngredient.remove();
      recipeContainer.innerHTML = '';
      displayRecipes(allRecipes);
      inputRecipeListner();
    });
  }

  if (closeApplianceTag) {
    closeApplianceTag.addEventListener('click', () => {
      tagAppliance.remove();
      recipeContainer.innerHTML = '';
      displayRecipes(allRecipes);
      inputRecipeListner();
    });
  }
}

/**
 * Display selected ingredient tag in tag section and searched recipes by ingredient
 * @param {Array} ingredients
 * @param {Array} recipes
 */
function displayTag() {
  //let searchedRecipeByIngredient = [];
  let ingredients = document.querySelectorAll('.ingredient-item');
  let appliances = document.querySelectorAll('.appliance-item');

  ingredients.forEach((ingredient) => {
    ingredient.addEventListener('click', () => {
      //let ingredientTag = `<button type="button" class="btn ingredient-tag"><span class="ingredient-name tag"></span><i class="bi bi-x-circle ingredient-close"></i></div>`;
      let ingredientSelected = ingredient.textContent;
      let currentIngredientTag = document.querySelector('.ingredient-tag');

      ingredientItems.style.display = 'none';
      ingredientInput.style.display = 'none';
      ingredientLabel.style.display = 'block';

      if (!currentIngredientTag) {
        createIngredientTag(ingredientSelected);
        closeTag();

        /*searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);*/
      } else {
        updateIngredientTag(ingredientSelected);
        closeTag();
        /*searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        selectAppliance(searchedRecipeByIngredient);
        selectUstensil(searchedRecipeByIngredient);*/
      }
    });
  });

  appliances.forEach((appliance) => {
    appliance.addEventListener('click', () => {
      let applianceSelected = appliance.textContent;
      let currentApplianceTag = document.querySelector('.appliance-tag');

      applianceItems.style.display = 'none';
      applianceInput.style.display = 'none';
      applianceLabel.style.display = 'block';

      if (!currentApplianceTag) {
        createApplianceTag(applianceSelected);
        closeTag();

        /*searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);*/
      } else {
        updateApplianceTag(applianceSelected);
        closeTag();
        /*searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        selectAppliance(searchedRecipeByIngredient);
        selectUstensil(searchedRecipeByIngredient);*/
      }
    });
  });
}

/**
 * Select a tag in dropdown menu
 */
export function selectTag() {
  const ingredientList = getIngredientList(allRecipes);
  const applianceList = getApplianceList(allRecipes);

  for (let i = 0; i < ingredientList.length; i++) {
    ingredientItems.insertAdjacentHTML(
      'beforeend',
      `<li class="dropdown-item ingredient-item">${ingredientList[i]}</li>`
    );
  }
  for (let i = 0; i < applianceList.length; i++) {
    applianceItems.insertAdjacentHTML(
      'beforeend',
      `<li class="dropdown-item appliance-item">${applianceList[i]}</li>`
    );
  }

  // Listener in ingredient tag button
  ingredientLabel.addEventListener('click', () => {
    ingredientInput.style.display = 'block';
    ingredientInput.style.width = '667px';
    arrowUpIngredient.style.display = 'block';
    ingredientLabel.style.display = 'none';
    ingredientItems.style.display = 'flex';
  });

  // Listener in appliance tag button
  applianceLabel.addEventListener('click', () => {
    applianceInput.style.display = 'block';
    applianceInput.style.width = '667px';
    arrowUpAppliance.style.display = 'block';
    applianceLabel.style.display = 'none';
    applianceItems.style.display = 'flex';
  });

  displayTag();
}