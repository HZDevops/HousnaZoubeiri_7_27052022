import { getUstensilList } from '../utils/getUstensilList.js';
import { searchByUstensil } from '../utils/searchRecipe.js';
import { displayRecipes } from '../utils/displayRecipes.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const ustensilInput = document.getElementById('ustensil-input');
const ustensilLabel = document.getElementById('ustensil-label');
const ustensilItems = document.querySelector('.ustensil-items');
let tagContainer = document.querySelector('.tag-container');

let ustensilTag = '';
let ustensilArray = [];

ustensilInput.style.display = 'none';

/**
 * Create ustensil tag in tag section
 */
function createUstensilTag() {
  ustensilTag = `<button type="button" class="btn ustensil-tag"><span class="appliance-name tag"></span><i class="bi bi-x-circle"></i></div>`;
  tagContainer.innerHTML = ustensilTag;
}

/**
 * Update ustensil tag in tag section
 * @param {Array} textContent
 */
function updateSelectedTag(textContent) {
  let ustensil = document.querySelector('.appliance-name');
  if (!ustensil) {
    createUstensilTag();
  } else {
    ustensil.innerHTML = textContent;
  }
}

/**
 * Remove tag in tag section when click in cross icon
 * @param {Array} recipes
 */
function closeUstensilTag(recipes) {
  const tag = document.querySelector('.ustensil-tag');
  const closeTag = document.querySelector('.bi-x-circle');

  closeTag.addEventListener('click', function (e) {
    tag.remove();
    displayRecipes(recipes);
  });
}

/**
 * Display selected ustensil tag in tag section and searched recipes by appliance
 * @param {Array} ustensils
 * @param {Array} recipes
 */
function displayApplianceTag(ustensils, recipes) {
  ustensils.forEach((ustensil) => {
    ustensil.addEventListener('click', (e) => {
      ustensilItems.style.display = 'none';
      ustensilInput.style.display = 'none';
      ustensilLabel.style.display = 'block';
      let ustensilSelected = ustensil.textContent;

      if (ustensilTag) {
        updateSelectedTag(ustensilSelected);
        closeUstensilTag(recipes);
        
        let searchedRecipe = searchByUstensil(recipes, ustensil.textContent);
        recipeContainer.innerHTML = '';
        console.log(searchedRecipe);
        displayRecipes(searchedRecipe);
      } else {
        createUstensilTag();
        closeUstensilTag(recipes);
        updateSelectedTag(ustensilSelected);
        
        let searchedRecipe = searchByUstensil(recipes, ustensil.textContent);
        recipeContainer.innerHTML = '';
        console.log(searchedRecipe);
        displayRecipes(searchedRecipe);
      }
    });
  });
}

/**
 * Select ustensil tag in dropdown menu
 * @param {Array} recipes
 */
export function selectUstensil(recipes) {
  const ustensilArray = getUstensilList(recipes);

  for (let i = 0; i < ustensilArray.length; i++) {
    ustensilItems.insertAdjacentHTML(
      'beforeend',
      `<li><a class="dropdown-item" href="#">${ustensilArray[i]}</a></li>`
    );
  }

  ustensilLabel.addEventListener('click', function (e) {
    ustensilInput.style.display = 'block';
    ustensilLabel.style.display = 'none';
    ustensilItems.style.display = 'block';

    let ustensils = Array.from(
      document.getElementsByClassName('dropdown-item')
    );

    displayApplianceTag(ustensils, recipes);

    ustensilInput.addEventListener('keyup', function (e) {
      let input = e.target.value.toLowerCase();
      let newUstensilArray = ustensilArray.filter((ustensil) =>
        ustensil.toLowerCase().includes(input)
      );

      ustensilItems.innerHTML = '';

      for (let i = 0; i < newUstensilArray.length; i++) {
        ustensilItems.insertAdjacentHTML(
          'beforeend',
          `<li><a class="dropdown-item" href="#">${newUstensilArray[i]}</a></li>`
        );
      }
      ustensils = Array.from(document.getElementsByClassName('dropdown-item'));

      displayUstensilTag(ustensils, recipes);
    });
  });
  /*window.addEventListener('click', function(e){
    applianceItems.style.display = 'none';
    applianceInput.style.display = 'none';
    applianceLabel.style.display = 'block';
  })*/
}