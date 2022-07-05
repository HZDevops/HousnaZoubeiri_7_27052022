import { getApplianceList } from '../utils/getApplianceList.js';
import { searchByAppliance } from '../utils/searchRecipe.js';
import { displayRecipes } from '../utils/displayRecipes.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const applianceInput = document.getElementById('appliance-input');
const applianceLabel = document.getElementById('appliance-label')
const applianceItems = document.querySelector('.appliance-items');
const arrowUp = document.querySelector('.bi-chevron-up');
let tagContainer = document.querySelector ('.tag-container');


let applianceTag = ''

applianceInput.style.display = 'none';
arrowUp.style.display = 'none';

/**
 * Create appliance tag in tag section
 */
function createApplianceTag () {
  applianceTag = `<button type="button" class="btn appliance-tag"><span class="appliance-name tag"></span><i class="bi bi-x-circle"></i></div>`
  tagContainer.innerHTML = applianceTag;
}

/**
 * Update appliance tag in tag section
 * @param {Array} textContent
 */
function updateSelectedTag (textContent) {
  let appliance = document.querySelector('.appliance-name')
  if (!appliance) {
    createApplianceTag ();
  } else {
    appliance.innerHTML = textContent;
  }
}

/**
 * Remove tag in tag section when click in cross icon 
 * @param {Array} recipes
 */
function closeApplianceTag(recipes) {
  const tag = document.querySelector('.appliance-tag');
  const closeTag = document.querySelector('.bi-x-circle');

  closeTag.addEventListener('click', function (e) {
    tag.remove();
    inputRecipeListner();
  });
}

/**
 * Display selected appliance tag in tag section and searched recipes by appliance 
 * @param {Array} appliances
 * @param {Array} recipes
 */
function displayApplianceTag (appliances, recipes) {
  
  appliances.forEach((appliance) => {
    appliance.addEventListener('click', (e) => {
      applianceItems.style.display = 'none';
      applianceInput.style.display = 'none';
      applianceLabel.style.display = 'block';
      let applianceSelected = appliance.textContent;

      if(applianceTag){
        updateSelectedTag(applianceSelected);
        closeApplianceTag(recipes);
        let searchedRecipe = searchByAppliance(recipes, appliance.textContent);
        recipeContainer.innerHTML = '';
        console.log(searchedRecipe);
        displayRecipes(searchedRecipe);
      } else {
        createApplianceTag();
        closeApplianceTag(recipes);
        updateSelectedTag(applianceSelected);
        let searchedRecipe = searchByAppliance(recipes, appliance.textContent);
        recipeContainer.innerHTML = '';
        console.log(searchedRecipe);
        displayRecipes(searchedRecipe);
        
      }  
    })
  })
}

/**
 * Select appliance tag in dropdown menu
 * @param {Array} recipes 
 */
export function selectAppliance(recipes) {
  const applianceArray = getApplianceList(recipes);
 
  for (let i = 0; i < applianceArray.length; i++) {
    applianceItems.insertAdjacentHTML('beforeend',`<li class="dropdown-item appliance">${applianceArray[i]}</li>`);
  }
 
  applianceLabel.addEventListener('click', function (e) {
    applianceInput.style.display = 'block';
    applianceInput.style.width = '667px';
    arrowUp.style.display = 'block';
    applianceLabel.style.display = 'none';
    applianceItems.style.display = 'flex';
    
    let appliances = Array.from(document.getElementsByClassName('dropdown-item'));
    
    displayApplianceTag(appliances,recipes);

    applianceInput.addEventListener('keyup', function(e) {
      let input = e.target.value.toLowerCase();
      let newApplianceArray = applianceArray.filter(appliance => appliance.toLowerCase().includes(input))
    
      applianceItems.innerHTML = '';

      for (let i = 0; i < newApplianceArray.length; i++) {
        applianceItems.insertAdjacentHTML('beforeend',
                `<li class="dropdown-item">${newApplianceArray[i]}</li>`);
      }
      appliances = Array.from(
        document.getElementsByClassName('dropdown-item')
      );

      displayApplianceTag(appliances,recipes)
    })
    if (arrowUp) {
      arrowUp.addEventListener('click', (event) => {
        applianceInput.style.display = 'none';
        applianceItems.style.display = 'none';
        arrowUp.style.display = 'none';
        applianceLabel.style.display = 'block';
      });
    }
  })
  
}