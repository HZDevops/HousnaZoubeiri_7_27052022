import { getIngredientList } from '../utils/getIngredientList.js';
import { getApplianceList } from '../utils/getApplianceList.js';
import { getUstensilList } from '../utils/getUstensilList.js';
import { createIngredientTag, createApplianceTag, createUstensilTag, updateIngredientTag, updateApplianceTag, updateUstensilTag  } from '../utils/createUpdateTag.js';
import { closeTag } from '../utils/closeTag.js';
import { searchByIngredient, searchByAppliance, searchByUstensil } from '../components/searchRecipe.js';
import { displayRecipes } from '../components/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';

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

const allRecipes = await getRecipes();

ingredientInput.style.display = 'none';
applianceInput.style.display = 'none';
ustensilInput.style.display = 'none';
arrowUpIngredient.style.display = 'none';
arrowUpAppliance.style.display = 'none';
arrowUpUstensil.style.display = 'none';

/**
 * Display selected tag in tag section and searched recipes by ingredient, appliance and ustensil tag
 * @param {Array} recipes
 */
function displayTag(recipes) {
  let ingredients = document.querySelectorAll('.ingredient-item');
  let appliances = document.querySelectorAll('.appliance-item');
  let ustensils = document.querySelectorAll('.ustensil-item');

  let searchedRecipeByTag = [];
  let searchedRecipeByIngredient = [];
  let searchedRecipeByAppliance = [];
  let searchedRecipeByUstensil = [];

  //Create, update, close and search by ingredient tag
  ingredients.forEach((ingredient) => {
    ingredient.addEventListener('click', () => {
      let ingredientSelected = ingredient.textContent;
      let currentIngredientTag = document.querySelector('.ingredient-tag');
      let currentApplianceTag = document.querySelector('.appliance-tag');

      ingredientItems.style.display = 'none';
      ingredientInput.style.display = 'none';
      ingredientLabel.style.display = 'block';

      if (!currentIngredientTag) {
        createIngredientTag(ingredientSelected);
        closeTag();
        if (!currentApplianceTag) {
          searchedRecipeByIngredient = searchByIngredient(
            recipes,
            ingredientSelected
          );
          if (searchedRecipeByIngredient.length === 0) {
            const recipeInfo = `<p id="recipe-info">
          Aucune recette ne correspond à votre critère… vous pouvez chercher «
          tarte aux pommes », « poisson », etc.</p>`;
            recipeContainer.innerHTML = recipeInfo;
          } else {
            recipeContainer.innerHTML = '';
            displayRecipes(searchedRecipeByIngredient);
            searchedRecipeByTag = searchedRecipeByIngredient;
          }
        } else {
          searchedRecipeByIngredient = searchByIngredient(
            searchedRecipeByTag,
            ingredientSelected
          );
          
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByIngredient);
          searchedRecipeByTag = searchedRecipeByIngredient;
        }
      } else {
        updateIngredientTag(ingredientSelected);
        closeTag();
        if (!currentApplianceTag) {
          searchedRecipeByIngredient = searchByIngredient(
            recipes,
            ingredientSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByIngredient);
          searchedRecipeByTag = searchedRecipeByIngredient;
        } else {
          searchedRecipeByIngredient = searchByIngredient(
            searchedRecipeByAppliance,
            ingredientSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByIngredient);
          searchedRecipeByTag = searchedRecipeByIngredient;
        }
      }
    });
  });

  //Create, update, close and search by appliance tag
  appliances.forEach((appliance) => {
    //console.log(searchedRecipeByTag)
    appliance.addEventListener('click', () => {
      let applianceSelected = appliance.textContent;
      let currentApplianceTag = document.querySelector('.appliance-tag');
      let currentIngredientTag = document.querySelector('.ingredient-tag');
      let currentUstensilTag = document.querySelector('.ustensil-tag');

      applianceItems.style.display = 'none';
      applianceInput.style.display = 'none';
      applianceLabel.style.display = 'block';

      if (!currentApplianceTag) {
        createApplianceTag(applianceSelected);
        closeTag();
        if (!currentIngredientTag && !currentUstensilTag) {
          searchedRecipeByAppliance = searchByAppliance(
            recipes,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        } else {
          searchedRecipeByAppliance = searchByAppliance(
            searchedRecipeByTag,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        }
      } else {
        updateApplianceTag(applianceSelected);
        closeTag();
        if (!currentIngredientTag && !currentUstensilTag) {
          searchedRecipeByAppliance = searchByAppliance(
            recipes,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        } 
        if(currentIngredientTag){
          searchedRecipeByAppliance = searchByAppliance(
            searchedRecipeByIngredient,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        }
        if(currentUstensilTag){
          searchedRecipeByAppliance = searchByAppliance(
            searchedRecipeByUstensil,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        }
        if (currentIngredientTag && currentUstensilTag) {
          searchedRecipeByAppliance = searchByAppliance(
            searchedRecipeByTag,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        } /*else {
          searchedRecipeByAppliance = searchByAppliance(
            searchedRecipeByIngredient,
            applianceSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByAppliance);
          searchedRecipeByTag = searchedRecipeByAppliance;
        }*/
      }
    });
  });

  //Create, update, close ans search by ustensil tag
  ustensils.forEach((ustensil) => {
    ustensil.addEventListener('click', () => {
      let ustensilSelected = ustensil.textContent;
      let currentIngredientTag = document.querySelector('.ingredient-tag');
      let currentApplianceTag = document.querySelector('.appliance-tag');
      let currentUstensilTag = document.querySelector('.ustensil-tag');
        
      ustensilItems.style.display = 'none';
      ustensilInput.style.display = 'none';
      ustensilLabel.style.display = 'block';

      if (!currentUstensilTag) {
        createUstensilTag(ustensilSelected);
        closeTag();
        if (!currentIngredientTag && !currentApplianceTag) {
          searchedRecipeByUstensil = searchByUstensil(
            recipes,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        } else {
          searchedRecipeByUstensil = searchByUstensil(
            searchedRecipeByTag,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        }
      } else {
        updateUstensilTag(ustensilSelected);
        closeTag();
        if (!currentIngredientTag && !currentApplianceTag) {
          searchedRecipeByUstensil = searchByUstensil(
            recipes,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        } 
        if (!currentIngredientTag && !currentApplianceTag) {
          searchedRecipeByUstensil = searchByUstensil(
            recipes,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        }
        if (currentIngredientTag) {
          searchedRecipeByUstensil = searchByUstensil(
            searchedRecipeByIngredient,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        }
        if (currentApplianceTag) {
          searchedRecipeByUstensil = searchByUstensil(
            searchedRecipeByAppliance,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        }
        if (currentIngredientTag && currentApplianceTag) {
          searchedRecipeByUstensil = searchByUstensil(
            searchedRecipeByTag,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        } /*else {
          searchedRecipeByUstensil = searchByUstensil(
            searchedRecipeByAppliance,
            ustensilSelected
          );
          recipeContainer.innerHTML = '';
          displayRecipes(searchedRecipeByUstensil);
          searchedRecipeByTag = searchedRecipeByUstensil;
        }*/
      }
    });
  });
}

/**
 * Select a tag in dropdown menu and display it
 * @param {Array} recipes
 */
export function selectTag(recipes) {
  const ingredientList = getIngredientList(allRecipes);
  const applianceList = getApplianceList(allRecipes);
  const ustensilList = getUstensilList(allRecipes);

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
      `<li><a class="dropdown-item ustensil-item" href="#">${ustensilList[i]}</a></li>`
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

  // Listener in ustensil tag button
  ustensilLabel.addEventListener('click', () => {
    ustensilInput.style.display = 'block';
    ustensilInput.style.width = '667px';
    arrowUpUstensil.style.display = 'block';
    ustensilLabel.style.display = 'none';
    ustensilItems.style.display = 'flex';
  });
  displayTag(recipes);
}