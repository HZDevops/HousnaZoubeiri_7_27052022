import { getUstensilList } from '../utils/getUstensilList.js';
import { searchByUstensil } from '../utils/searchRecipe.js';
import { inputRecipeListner } from '../index.js';
import { displayRecipes } from '../utils/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const ustensilInput = document.getElementById('ustensil-input');
const ustensilLabel = document.getElementById('ustensil-label');
const ustensilItems = document.querySelector('.ustensil-list');
const arrowUp = document.querySelector('.ustensil-chevron');

let tagContainer = document.querySelector('.tag-container');
let ustensilTag = `<button type="button" class="btn ustensil-tag"><span class="ustensil-name tag"></span><i class="bi bi-x-circle close-ustensil"></i></div>`;

ustensilInput.style.display = 'none';
arrowUp.style.display = 'none';

/**
 * Create ustensil tag in tag section
 * @param {String} ustensilValue
 */
function createUstensilTag(ustensilValue) {
  tagContainer.insertAdjacentHTML('beforeend', ustensilTag);
  
  let ustensilName = document.querySelector('.ustensil-name');
  ustensilName.innerHTML = ustensilValue;
}

/**
 * Update ustensil tag in tag section
 *  @param {String} ustensilValue
 */
function updateUstensilTag(ustensilValue) {
  let ustensil = document.querySelector('.ustensil-name');
  
  ustensil.innerHTML = ustensilValue;
}

/**
 * Remove tag in tag section when click in cross icon
 * @param {Array} recipes
 */
async function closeUstensilTag(recipes) {
  const tag = document.querySelector('.ustensil-tag');
  const closeTag = document.querySelector('.close-ustensil');
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
 * Display selected ustensil tag in tag section and searched recipes by ustensil
 * @param {Array} ustensils
 * @param {Array} recipes
 */
function displayApplianceTag(ustensils, recipes) {

  ustensils.forEach((ustensil) => {
    ustensil.addEventListener('click', (e) => {
      let searchedRecipeByUstensil = [];
      let ustensilSelected = ustensil.textContent;
      let currentUstensilTag = document.querySelector('.ustensil-tag');

      ustensilItems.style.display = 'none';
      ustensilInput.style.display = 'none';
      ustensilLabel.style.display = 'block';
      

      if (currentUstensilTag) {
        updateUstensilTag(ustensilSelected);
        closeUstensilTag(recipes);

        searchedRecipeByUstensil = searchByUstensil(recipes, ustensilSelected);
        recipeContainer.innerHTML = '';
        displayRecipes(searchedRecipeByUstensil);
      } else {
        createUstensilTag();
        closeUstensilTag(recipes);
        updateUstensilTag(ustensilSelected);

        searchedRecipeByUstensil = searchByUstensil(
          recipes,
          ustensilSelected
        );
        recipeContainer.innerHTML = '';
        console.log(searchedRecipeByUstensil);
        displayRecipes(searchedRecipeByUstensil);
      }
    });
  });
}

/**
 * Select ustensil tag in dropdown menu
 * @param {Array} recipes
 */
export function selectUstensil(recipes, searchedRecipesFromMainInput) {
  const ustensilList = getUstensilList(recipes);

  for (let i = 0; i < ustensilList.length; i++) {
    ustensilItems.insertAdjacentHTML(
      'beforeend',
      `<li><a class="dropdown-item ustensil-item" href="#">${ustensilList[i]}</a></li>`
    );
  }

  ustensilLabel.addEventListener('click', function (e) {
    ustensilInput.style.display = 'block';
    ustensilInput.style.width = '667px';
    arrowUp.style.display = 'block';
    ustensilLabel.style.display = 'none';
    ustensilItems.style.display = 'flex';

    let ustensilsFromDropdownMenu = Array.from(
      document.getElementsByClassName('ustensil-item')
    );

    displayApplianceTag(
      ustensilsFromDropdownMenu,
      searchedRecipesFromMainInput
    );

    ustensilInput.addEventListener('keyup', function (e) {
      let input = e.target.value.toLowerCase();
      let newUstensilArray = ustensilsFromDropdownMenu.filter((ustensil) =>
        ustensil.toLowerCase().includes(input)
      );

      ustensilItems.innerHTML = '';

      for (let i = 0; i < newUstensilArray.length; i++) {
        ustensilItems.insertAdjacentHTML(
          'beforeend',
          `<li><a class="dropdown-item ustensil-item" href="#">${newUstensilArray[i]}</a></li>`
        );
      }
      ustensilsFromDropdownMenu = Array.from(document.getElementsByClassName('ustensil-item'));

      displayUstensilTag(ustensilsFromDropdownMenu, searchedRecipesFromMainInput);
    });
  });
}