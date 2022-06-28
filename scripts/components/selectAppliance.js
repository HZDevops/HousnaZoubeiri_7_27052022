import { getApplianceList } from '../utils/getApplianceList.js';
import { searchByAppliance } from '../utils/searchRecipe.js';
import { displayRecipes } from '../index.js';

//DOM Elements
const recipeContainer = document.querySelector('.recipe-container');
const applianceInput = document.getElementById('appliance-input');
const applianceLabel = document.getElementById('appliance-label')
const applianceItems = document.querySelector('.appliance-items');
let tagContainer = document.querySelector ('.dropdown-tag');

let applianceArray = [];

applianceInput.style.display = 'none';

//Create appliance tag in dropdown tags section
function displaySelectedTag (textContent) {
  let applianceTag = document.createElement('div');
let tagContent = document.createElement('span')
let cross = document.createElement('i');
applianceTag.classList.add('tag');
tagContent.classList.add('appliance-tag')
cross.classList.add('fa-solid');
cross.classList.add('fa-circle-xmark');
tagContainer.appendChild(applianceTag);
applianceTag.appendChild(tagContent)
applianceTag.innerHTML = textContent
applianceTag.appendChild(cross)
}
/**
 * Display or update appliance tag in dropdown tags section
 * @param {Array} appliances
 */
function displayApplianceTag (appliances, recipes) {
  recipeContainer.innerHTML = '';
  let tag ='';
  appliances.forEach((appliance) => {
    appliance.addEventListener('click', (e) => {
      applianceItems.style.display = 'none';
      applianceInput.style.display = 'none';
      applianceLabel.style.display = 'block';
      tag = appliance.textContent;
      displaySelectedTag(tag);
      let searchedRecipe = searchByAppliance(recipes, appliance.textContent);
      console.log(searchedRecipe);
      displayRecipes(searchedRecipe);
    })
  })
}

/**
 * Select appliance tag in dropdown menu
 * @param {Array} recipes 
 */
export function selectAppliance(recipes) {
  const array = getApplianceList(recipes);
 
  applianceArray = array.filter((ele, pos) => array.indexOf(ele) == pos);
  console.log(applianceArray);
  for (let i = 0; i < applianceArray.length; i++) {
    applianceItems.insertAdjacentHTML('beforeend',`<li><a class="dropdown-item" href="#">${applianceArray[i]}</a></li>`);
  }
 
  applianceLabel.addEventListener('click', function (e) {
    applianceInput.style.display = 'block';
    applianceLabel.style.display = 'none';
    applianceItems.style.display = 'block';
    
    let appliances = Array.from(document.getElementsByClassName('dropdown-item'));
    
    displayApplianceTag(appliances,recipes);

    applianceInput.addEventListener('keyup', function(e) {
      let input = e.target.value.toLowerCase();
      let newApplianceArray = applianceArray.filter(appliance => appliance.toLowerCase().includes(input))
      console.log(recipes);
      //console.log(newApplianceArray);
      applianceItems.innerHTML = '';
      for (let i = 0; i < newApplianceArray.length; i++) {
        applianceItems.insertAdjacentHTML('beforeend',
                `<li><a class="dropdown-item" href="#">${newApplianceArray[i]}</a></li>`);
      }
      appliances = Array.from(
        document.getElementsByClassName('dropdown-item')
      );
      //console.log(recipes)
      displayApplianceTag(appliances,recipes)
    })
     
        //console.log(appliances)
         //displayTag(appliances);
  })

}