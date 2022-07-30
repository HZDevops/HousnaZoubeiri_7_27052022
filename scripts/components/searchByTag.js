import { getRecipes } from '../utils/getData.js';
import { createItemTagList } from '../utils/createItemTagList.js';
import {
  openTagDropDownMenu,
  closeTagDropDownMenu,
} from './TagDropDownMenu.js';
import {
  createIngredientTag,
  createApplianceTag,
  createUstensilTag,
  updateIngredientTag,
  updateApplianceTag,
  updateUstensilTag,
} from '../utils/createUpdateTag.js';
import { closeTag } from '../utils/closeTag.js';
import {
  searchByIngredient,
  searchByAppliance,
  searchByUstensil,
} from '../components/searchRecipe.js';
import { displayRecipes } from '../components/displayRecipes.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');

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

//DOM elements for ustensil tag
const ustensilInput = document.getElementById('ustensil-input');
const ustensilLabel = document.getElementById('ustensil-label');
const ustensilItems = document.querySelector('.ustensil-list');
const arrowUpUstensil = document.querySelector('.ustensil-chevron');

export const allRecipes = await getRecipes();

//Tag fields initialisation
ingredientInput.style.display = 'none';
applianceInput.style.display = 'none';
ustensilInput.style.display = 'none';
arrowUpIngredient.style.display = 'none';
arrowUpAppliance.style.display = 'none';
arrowUpUstensil.style.display = 'none';

//Array initialisation for storing search recipes, tag close state and tag text selected
export let searchedRecipeByTag = [];
export let searchedRecipeByIngredient = [];
export let searchedRecipeByAppliance = [];
export let searchedRecipeByUstensil = [];
export let closed = [true, true, true];
export let selectedTagText = ['', '', ''];

/**
 * Set value in searched array by tag
 * @param {Array} value
 */
export function setSearchedRecipeByIngredient(value) {
  searchedRecipeByTag = value;
}

/**
 * Set value in searched array by appliance
 * @param {Array} value
 */
export function setSearchedRecipeByAppliance(value) {
  searchedRecipeByAppliance = value;
}

/**
 * Set value in searched array by ustensil
 * @param {Array} value
 */
export function setSearchedRecipeByUstensil(value) {
  searchedRecipeByUstensil = value;
}

/**
 * Display selected tag in tag section and searched recipes by ingredient, appliance or ustensil tag
 * @param {Array} recipes
 */
export function displayTag(recipes) {
  let ingredients = document.querySelectorAll('.ingredient-item');
  let appliances = document.querySelectorAll('.appliance-item');
  let ustensils = document.querySelectorAll('.ustensil-item');

  //Create, update, close and search by ingredient tag
  ingredients.forEach((ingredient) => {
    ingredient.addEventListener('click', () => {
      closed[0] = false;
      let ingredientSelected = ingredient.textContent;
      let currentIngredientTag = document.querySelector('.ingredient-tag');
      let currentApplianceTag = document.querySelector('.appliance-tag');
      let currentUstensilTag = document.querySelector('.ustensil-tag');

      ingredientItems.style.display = 'none';
      ingredientInput.style.display = 'none';
      ingredientLabel.style.display = 'block';

      if (!currentIngredientTag) {
        createIngredientTag(ingredientSelected);
      } else {
        updateIngredientTag(ingredientSelected);
      }

      if (!currentApplianceTag && !currentUstensilTag) {
        searchedRecipeByIngredient = searchByIngredient(
          recipes,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        createItemTagList(searchedRecipeByIngredient);
        searchedRecipeByTag = searchedRecipeByIngredient;
      } else if (currentApplianceTag && !currentUstensilTag) {
        searchedRecipeByIngredient = searchByIngredient(
          searchedRecipeByAppliance,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        createItemTagList(searchedRecipeByIngredient);
        searchedRecipeByTag = searchedRecipeByIngredient;
      } else if (!currentApplianceTag && currentUstensilTag) {
        searchedRecipeByIngredient = searchByIngredient(
          searchedRecipeByUstensil,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        createItemTagList(searchedRecipeByIngredient);
        searchedRecipeByTag = searchedRecipeByIngredient;
      } else if (currentApplianceTag && currentUstensilTag) {
        searchedRecipeByIngredient = searchByIngredient(
          searchedRecipeByTag,
          ingredientSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByIngredient);
        createItemTagList(searchedRecipeByIngredient);
        searchedRecipeByTag = searchedRecipeByIngredient;
      }
      selectedTagText[0] = ingredientSelected;
      closeTag(ingredientSelected);
    });
  });

  //Create, update, close and search by appliance tag
  appliances.forEach((appliance) => {
    appliance.addEventListener('click', () => {
      closed[1] = false;
      let applianceSelected = appliance.textContent;
      let currentApplianceTag = document.querySelector('.appliance-tag');
      let currentIngredientTag = document.querySelector('.ingredient-tag');
      let currentUstensilTag = document.querySelector('.ustensil-tag');

      applianceItems.style.display = 'none';
      applianceInput.style.display = 'none';
      applianceLabel.style.display = 'block';

      if (!currentApplianceTag) {
        createApplianceTag(applianceSelected);
      } else {
        updateApplianceTag(applianceSelected);
      }

      if (!currentIngredientTag && !currentUstensilTag) {
        searchedRecipeByAppliance = searchByAppliance(
          recipes,
          applianceSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByAppliance);
        createItemTagList(searchedRecipeByAppliance);
        searchedRecipeByTag = searchedRecipeByAppliance;
      } else if (currentIngredientTag && !currentUstensilTag) {
        searchedRecipeByAppliance = searchByAppliance(
          searchedRecipeByIngredient,
          applianceSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByAppliance);
        createItemTagList(searchedRecipeByAppliance);
        searchedRecipeByTag = searchedRecipeByAppliance;
      } else if (!currentIngredientTag && currentUstensilTag) {
        searchedRecipeByAppliance = searchByAppliance(
          searchedRecipeByUstensil,
          applianceSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByAppliance);
        createItemTagList(searchedRecipeByAppliance);
        searchedRecipeByTag = searchedRecipeByAppliance;
      } else if (currentIngredientTag && currentUstensilTag) {
        searchedRecipeByAppliance = searchByAppliance(
          searchedRecipeByTag,
          applianceSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByAppliance);
        createItemTagList(searchedRecipeByAppliance);
        searchedRecipeByTag = searchedRecipeByAppliance;
      }
      selectedTagText[1] = applianceSelected;
      closeTag(applianceSelected);
    });
  });

  //Create, update, close ans search by ustensil tag
  ustensils.forEach((ustensil) => {
    ustensil.addEventListener('click', () => {
      closed[2] = false;
      let ustensilSelected = ustensil.textContent;
      let currentIngredientTag = document.querySelector('.ingredient-tag');
      let currentApplianceTag = document.querySelector('.appliance-tag');
      let currentUstensilTag = document.querySelector('.ustensil-tag');

      ustensilItems.style.display = 'none';
      ustensilInput.style.display = 'none';
      ustensilLabel.style.display = 'block';

      if (!currentUstensilTag) {
        createUstensilTag(ustensilSelected);
      } else {
        updateUstensilTag(ustensilSelected);
      }

      if (!currentIngredientTag && !currentApplianceTag) {
        searchedRecipeByUstensil = searchByUstensil(recipes, ustensilSelected);
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByUstensil);
        createItemTagList(searchedRecipeByUstensil);
        searchedRecipeByTag = searchedRecipeByUstensil;
      } else if (currentIngredientTag && !currentApplianceTag) {
        searchedRecipeByUstensil = searchByUstensil(
          searchedRecipeByIngredient,
          ustensilSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByUstensil);
        createItemTagList(searchedRecipeByUstensil);
        searchedRecipeByTag = searchedRecipeByUstensil;
      } else if (!currentIngredientTag && currentApplianceTag) {
        searchedRecipeByUstensil = searchByUstensil(
          searchedRecipeByAppliance,
          ustensilSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByUstensil);
        createItemTagList(searchedRecipeByUstensil);
        searchedRecipeByTag = searchedRecipeByUstensil;
      } else if (currentIngredientTag && currentApplianceTag) {
        searchedRecipeByUstensil = searchByUstensil(
          searchedRecipeByTag,
          ustensilSelected
        );
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByUstensil);
        createItemTagList(searchedRecipeByUstensil);
        searchedRecipeByTag = searchedRecipeByUstensil;
      }
      selectedTagText[ustensilSelected];
      closeTag(ustensilSelected);
    });
  });
}

/**
 * Select a tag in dropdown menu and display it
 * @param {Array} recipes
 */
export function selectTag(recipes) {
  openTagDropDownMenu();
  let itemTagList = createItemTagList(recipes);
  closeTagDropDownMenu();

  // Listner in ingredient drop-down input
  ingredientInput.addEventListener('keyup', function (e) {
    let input = e.target.value.toLowerCase();
    let newIngredientArray = itemTagList.ingredientList.filter((ingredient) =>
      ingredient.toLowerCase().includes(input)
    );

    ingredientItems.innerHTML = '';

    for (let i = 0; i < newIngredientArray.length; i++) {
      ingredientItems.insertAdjacentHTML(
        'beforeend',
        `<li class="dropdown-item ingredient-item">${newIngredientArray[i]}</li>`
      );
    }
    displayTag(recipes);
  });

  //Listner in appliance drop-down input
  applianceInput.addEventListener('keyup', function (e) {
    let input = e.target.value.toLowerCase();
    let newApplianceArray = itemTagList.applianceList.filter((appliance) =>
      appliance.toLowerCase().includes(input)
    );

    applianceItems.innerHTML = '';

    for (let i = 0; i < newApplianceArray.length; i++) {
      applianceItems.insertAdjacentHTML(
        'beforeend',
        `<li class="dropdown-item appliance-item">${newApplianceArray[i]}</li>`
      );
    }
    displayTag(recipes);
  });

  //Listner in ustensil drop-down input
  ustensilInput.addEventListener('keyup', function (e) {
    let input = e.target.value.toLowerCase();
    let newUstensilArray = itemTagList.ustensilList.filter((ustensil) =>
      ustensil.toLowerCase().includes(input)
    );

    ustensilItems.innerHTML = '';

    for (let i = 0; i < newUstensilArray.length; i++) {
      ustensilItems.insertAdjacentHTML(
        'beforeend',
        `<li><a class="dropdown-item ustensil-item" href="#">${newUstensilArray[i]}</a></li>`
      );
    }
    displayTag(recipes);
  });
  displayTag(recipes);
}
