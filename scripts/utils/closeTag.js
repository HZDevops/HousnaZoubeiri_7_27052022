import { inputRecipeListner } from '../index.js';
import { displayRecipes } from '../components/displayRecipes.js';
import {
  searchByUstensil,
  searchByAppliance,
  searchByIngredient,
} from '../components/searchRecipe.js';
import { selectTag } from '../components/searchByTag.js';
import { getRecipes } from './getData.js';
import {
  searchedRecipeByIngredient,
  searchedRecipeByAppliance,
  searchedRecipeByUstensil,
  setSearchedRecipeByIngredient,
  setSearchedRecipeByAppliance,
  setSearchedRecipeByUstensil,
  selectedTagText,
  closed,
} from '../components/searchByTag.js';

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
  const ingredientInput = document.getElementById('ingredient-input');
  const applianceInput = document.getElementById('appliance-input');
  const ustensilInput = document.getElementById('ustensil-input');

  //Close ingredient tag
  if (closeIngredientTag) {
    closeIngredientTag.addEventListener('click', (e) => {
      e.stopPropagation();
      tagIngredient.remove();
      recipeContainer.innerHTML = '';
      ingredientInput.value = '';
      closed[0] = true;
      setSearchedRecipeByIngredient([]);
      if (closed[0] && closed[1] && closed[2]) {
        displayRecipes(allRecipes);
      } else {
        if ((!closed[1] && closed[2]) || (closed[1] && !closed[2])) {
          displayRecipes(
            [...searchedRecipeByAppliance, ...searchedRecipeByUstensil].filter(
              (elt, index, array) => array.indexOf(elt) === index
            )
          );
        } else {
          if (searchedRecipeByAppliance.length >= searchedRecipeByUstensil) {
            displayRecipes(
              searchByUstensil(searchedRecipeByAppliance, selectedTagText[2])
            );
          } else {
            displayRecipes(
              searchByAppliance(searchedRecipeByUstensil, selectedTagText[1])
            );
          }
        }
      }
      inputRecipeListner();
      selectTag(allRecipes);
    });
  }

  //Close appliance tag
  if (closeApplianceTag) {
    closeApplianceTag.addEventListener('click', (e) => {
      e.stopPropagation();
      tagAppliance.remove();
      recipeContainer.innerHTML = '';
      applianceInput.value = '';
      closed[1] = true;
      setSearchedRecipeByAppliance([]);
      if (closed[0] && closed[1] && closed[2]) {
        displayRecipes(allRecipes);
      } else {
        if ((!closed[0] && closed[2]) || (closed[0] && !closed[2])) {
          displayRecipes(
            [...searchedRecipeByIngredient, ...searchedRecipeByUstensil].filter(
              (elt, index, array) => array.indexOf(elt) === index
            )
          );
        } else {
          if (searchedRecipeByIngredient.length >= searchedRecipeByUstensil) {
            displayRecipes(
              searchByUstensil(searchedRecipeByIngredient, selectedTagText[2])
            );
          } else {
            displayRecipes(
              searchByIngredient(searchedRecipeByUstensil, selectedTagText[0])
            );
          }
        }
      }
      inputRecipeListner();
      selectTag(allRecipes);
    });
  }

  //Close ustensil tag
  if (closeUstensilTag) {
    closeUstensilTag.addEventListener('click', (e) => {
      e.stopPropagation();
      tagUstensil.remove();
      recipeContainer.innerHTML = '';
      ustensilInput.value = '';
      closed[2] = true;
      setSearchedRecipeByUstensil([]);
      if (closed[0] && closed[1] && closed[2]) {
        displayRecipes(allRecipes);
      } else {
        if ((!closed[0] && closed[1]) || (closed[0] && !closed[1])) {
          displayRecipes(
            [
              ...searchedRecipeByIngredient,
              ...searchedRecipeByAppliance,
            ].filter((elt, index, array) => array.indexOf(elt) === index)
          );
        } else {
          if (searchedRecipeByIngredient.length >= searchedRecipeByAppliance) {
            displayRecipes(
              searchByAppliance(searchedRecipeByIngredient, selectedTagText[1])
            );
          } else {
            displayRecipes(
              searchByIngredient(searchedRecipeByAppliance, selectedTagText[0])
            );
          }
        }
      }
      inputRecipeListner();
      selectTag(allRecipes);
    });
  }
}
