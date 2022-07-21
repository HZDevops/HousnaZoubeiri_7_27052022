import { inputRecipeListner } from '../index.js';
import { displayRecipes } from '../components/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');

const allRecipes = await getRecipes();

/**
 * Remove tag from tag section when click in cross icon
 */
export async function closeTag() {
  const tagIngredient = document.querySelector('.ingredient-tag');
  const tagAppliance = document.querySelector('.appliance-tag');
  const tagUstensil = document.querySelector('.ustensil-tag');
  let closeIngredientTag = document.querySelector('.ingredient-close');
  let closeApplianceTag = document.querySelector('.appliance-close');
  const closeUstensilTag = document.querySelector('.ustensil-close');

  //Close ingredient tag
  if (closeIngredientTag) {
    closeIngredientTag.addEventListener('click', () => {
      tagIngredient.remove();
      recipeContainer.innerHTML = '';
      displayRecipes(allRecipes);
      inputRecipeListner();
    });
  }

  //Close appliance tag
  if (closeApplianceTag) {
    closeApplianceTag.addEventListener('click', () => {
      tagAppliance.remove();
      recipeContainer.innerHTML = '';
      displayRecipes(allRecipes);
      inputRecipeListner();
    });
  }

  //Close ustensil tag
  if (closeUstensilTag) {
    closeUstensilTag.addEventListener('click', () => {
      tagUstensil.remove();
      recipeContainer.innerHTML = '';
      displayRecipes(allRecipes);
      inputRecipeListner();
    });
  }
}
