import { getApplianceList } from '../utils/getApplianceList.js';
import { searchByAppliance } from '../utils/searchRecipe.js';
import { inputRecipeListner } from '../index.js';
import { displayRecipes } from '../utils/displayRecipes.js';
import { getRecipes } from '../utils/getData.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const applianceInput = document.getElementById('appliance-input');
const applianceLabel = document.getElementById('appliance-label')
const applianceItems = document.querySelector('.appliance-list');
const arrowUp = document.querySelector('.appliance-chevron');

let tagContainer = document.querySelector ('.tag-container');
let applianceTag = `<button type="button" class="btn appliance-tag"><span class="appliance-name tag"></span><i class="bi bi-x-circle close-appliance"></i></div>`;

applianceInput.style.display = 'none';
arrowUp.style.display = 'none';

/**
 * Create appliance tag in tag section
 * @param {String} applianceValue
 */
function createApplianceTag(applianceValue) {
  tagContainer.insertAdjacentHTML('beforeend', applianceTag);

  let applianceName = document.querySelector('.appliance-name');
  applianceName.innerHTML = applianceValue;
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
 * @param {Array} recipes
 */
async function closeApplianceTag(recipes) {
  const tag = document.querySelector('.appliance-tag');
  const closeTag = document.querySelector('.close-appliance');
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
 * Display selected appliance tag in tag section and searched recipes by appliance 
 * @param {Array} appliances
 * @param {Array} recipes
 */
function displayApplianceTag (appliances, recipes) {
  
  appliances.forEach((appliance) => {
    appliance.addEventListener('click', (e) => {
      
      let searchedRecipeByAppliance = [];

      let applianceSelected = appliance.textContent;
      let currentApplianceTag = document.querySelector('.appliance-tag');
      
      applianceItems.style.display = 'none';
      applianceInput.style.display = 'none';
      applianceLabel.style.display = 'block';
     
      if (!currentApplianceTag) {
        createApplianceTag(applianceSelected);
        closeApplianceTag(recipes);
        
       searchedRecipeByAppliance = searchByAppliance(
          recipes,
          applianceSelected
        );

        recipeContainer.innerHTML = '';
        //console.log(searchedRecipeByIngredient);
        displayRecipes(searchedRecipeByAppliance);
      } else {
        updateApplianceTag(applianceSelected);
        closeApplianceTag(recipes);

        searchedRecipeByAppliance = searchByAppliance(
          recipes,
          applianceSelected
        );

        recipeContainer.innerHTML = '';
        console.log(searchedRecipeByAppliance);
        displayRecipes(searchedRecipeByAppliance);
      }  
    })
  })
}

/**
 * Select appliance tag in dropdown menu
 * @param {Array} recipes 
 */
export function selectAppliance(recipes, searchedRecipesInMainInput) {
  const applianceList = getApplianceList(recipes);
 
  for (let i = 0; i < applianceList.length; i++) {
    applianceItems.insertAdjacentHTML('beforeend',`<li class="dropdown-item appliance-item">${applianceList[i]}</li>`);
  }
 
  applianceLabel.addEventListener('click', function (e) {
    applianceInput.style.display = 'block';
    applianceInput.style.width = '667px';
    arrowUp.style.display = 'block';
    applianceLabel.style.display = 'none';
    applianceItems.style.display = 'flex';
    
    let appliancesFromDropdownMenu = Array.from(
      document.getElementsByClassName('appliance-item')
    );
    
    displayApplianceTag(appliancesFromDropdownMenu, searchedRecipesInMainInput);

    applianceInput.addEventListener('keyup', function(e) {
      let input = e.target.value.toLowerCase();
      let newApplianceArray = applianceList.filter((appliance) =>
        appliance.toLowerCase().includes(input)
      );
    
      applianceItems.innerHTML = '';

      for (let i = 0; i < newApplianceArray.length; i++) {
        applianceItems.insertAdjacentHTML('beforeend',
                `<li class="dropdown-item appliance-item">${newApplianceArray[i]}</li>`);
      }
      appliancesFromDropdownMenu = Array.from(
        document.getElementsByClassName('appliance-item')
      );

      displayApplianceTag(appliancesFromDropdownMenu,searchedRecipesInMainInput)
    })
    if (arrowUp) {
      arrowUp.addEventListener('click', () => {
        applianceInput.style.display = 'none';
        applianceItems.style.display = 'none';
        arrowUp.style.display = 'none';
        applianceLabel.style.display = 'block';
      });
    }
  })
  
}