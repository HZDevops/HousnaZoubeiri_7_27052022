import { getRecipes } from './getData.js';
import { getIngredientList } from './getIngredientList.js';
import { getApplianceList } from './getApplianceList.js';
import { getUstensilList } from './getUstensilList.js';
import { displayTag } from '../components/searchByTag.js';

//DOM elements
let currentIngredientTag = document.querySelector('.ingredient-tag');
let currentApplianceTag = document.querySelector('.appliance-tag');
let currentUstensilTag = document.querySelector('.ustensil-tag');

let ingredientItems = document.querySelector('.ingredient-list');
let applianceItems = document.querySelector('.appliance-list');
let ustensilItems = document.querySelector('.ustensil-list');

const allRecipes = await getRecipes();
let ingredientList = [];
let applianceList = [];
let ustensilList = [];

export function createItemTagList(recipes) {
  if (!currentIngredientTag && !currentApplianceTag && !currentUstensilTag) {
    ingredientList = getIngredientList(allRecipes);
    applianceList = getApplianceList(allRecipes);
    ustensilList = getUstensilList(allRecipes);
  }
  ingredientList = getIngredientList(recipes);
  applianceList = getApplianceList(recipes);
  ustensilList = getUstensilList(recipes);

  ingredientItems.innerHTML = '';
  applianceItems.innerHTML = '';
  ustensilItems.innerHTML = '';

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
  for (let i = 0; i < ustensilList.length; i++) {
    ustensilItems.insertAdjacentHTML(
      'beforeend',
      `<li class="dropdown-item ustensil-item">${ustensilList[i]}</li>`
    );
  }
  displayTag(recipes);
  return {ingredientList: ingredientList, 
          applianceList : applianceList,
          ustensilList : ustensilList
  };
}
