import { inputRecipeListner } from '../index.js';
import { displayRecipes } from '../components/displayRecipes.js';
import { searchByUstensil, searchByAppliance, searchByIngredient } from "../components/searchRecipe.js";
import { getRecipes } from '../utils/getData.js';

import { 
  searchedRecipeByTag,
  searchedRecipeByIngredient,
  searchedRecipeByAppliance,
  searchedRecipeByUstensil,
  setSearchedRecipeByIngredient,
  setSearchedRecipeByAppliance,
  setSearchedRecipeByUstensil,
  selectedTagText,
  closed
 } from "../components/searchByTag.js";
 
//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const allRecipes = await getRecipes();

/**
 * Remove tag from tag section when click in cross icon
 * @param {String} tagSelected
 */
export async function closeTag(tagSelected) {
  const tagIngredient = document.querySelector('.ingredient-tag');
  const tagAppliance = document.querySelector('.appliance-tag');
  const tagUstensil = document.querySelector('.ustensil-tag');
  const closeIngredientTag = document.querySelector('.ingredient-close');
  const closeApplianceTag = document.querySelector('.appliance-close');
  const closeUstensilTag = document.querySelector('.ustensil-close');

  /*console.log(searchedRecipeByIngredient,
    searchedRecipeByAppliance,
    searchedRecipeByUstensil)*/

  //Close ingredient tag
  if (closeIngredientTag) {
    closeIngredientTag.addEventListener('click', (e) => {
      e.stopPropagation()
      tagIngredient.remove();
      recipeContainer.innerHTML = '';
      closed[0] = true;
      setSearchedRecipeByIngredient([]);
      if(closed[0] && closed[1] && closed[2]) {
        displayRecipes(allRecipes)
      } else  {
        if((!closed[1] && closed[2]) || (closed[1] && !closed[2])) {
          displayRecipes([...new Set([...searchedRecipeByAppliance, ...searchedRecipeByUstensil])])
        } else {
          if(searchedRecipeByAppliance.length >= searchedRecipeByUstensil) {
            displayRecipes(searchByUstensil(searchedRecipeByAppliance, selectedTagText[2]))
          } else {
            displayRecipes(searchByAppliance(searchedRecipeByUstensil, selectedTagText[1]))
          }
        }
      }
      inputRecipeListner();
    });
  }

  //Close appliance tag
  if (closeApplianceTag) {
    closeApplianceTag.addEventListener('click', (e) => {
      e.stopPropagation()
      tagAppliance.remove();
      recipeContainer.innerHTML = '';
      closed[1] = true;
      setSearchedRecipeByAppliance([]);
      if(closed[0] && closed[1] && closed[2]) {
        displayRecipes(allRecipes)
      } else  {
        if((!closed[0] && closed[2]) || (closed[0] && !closed[2])) {
          displayRecipes([...new Set([...searchedRecipeByIngredient, ...searchedRecipeByUstensil])])
        } else {
          if(searchedRecipeByIngredient.length >= searchedRecipeByUstensil) {
            displayRecipes(searchByUstensil(searchedRecipeByIngredient, selectedTagText[2]))
          } else {
            displayRecipes(searchByIngredient(searchedRecipeByUstensil, selectedTagText[0]))
          }
        }
      }
      inputRecipeListner();
    });
  }

  //Close ustensil tag
  if (closeUstensilTag) {
    closeUstensilTag.addEventListener('click', (e) => {
      e.stopPropagation()
      tagUstensil.remove();
      recipeContainer.innerHTML = '';
      closed[2] = true;
      setSearchedRecipeByUstensil([]);
      if(closed[0] && closed[1] && closed[2]) {
        displayRecipes(allRecipes)
      } else  {
        if((!closed[0] && closed[1]) || (closed[0] && !closed[1])) {
          displayRecipes([...new Set([...searchedRecipeByIngredient, ...searchedRecipeByAppliance])])
        } else {
          if(searchedRecipeByIngredient.length >= searchedRecipeByAppliance) {
            displayRecipes(searchByAppliance(searchedRecipeByIngredient, selectedTagText[1]))
          } else {
            displayRecipes(searchByIngredient(searchedRecipeByAppliance, selectedTagText[0]))
          }
        }
      }
      inputRecipeListner();
    });
  }
}
