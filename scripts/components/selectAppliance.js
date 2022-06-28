import { getApplianceList } from "../utils/getApplianceList.js";

//DOM Elements
const applianceInput = document.getElementById('appliance-input');
const applianceLabel = document.getElementById('appliance-label')
const applianceItems = document.querySelector('.appliance-items');
let tagContainer = document.querySelector ('.dropdown-tag');

let applianceArray = [];

applianceInput.style.display = 'none';

//Create appliance tag in dropdown tags section
let applianceTag = document.createElement('span');
applianceTag.classList.add('appliance-tag');
tagContainer.appendChild(applianceTag);

/**
 * Display or update appliance tag in dropdown tags section
 * @param {Array} appliances
 */
function displayApplianceTag (appliances) {
  //let applianceSelected = document.querySelector('.dropdown-item')
  appliances.forEach((appliance) => {
    appliance.addEventListener('click', (e) => {
    applianceTag.innerHTML = appliance.textContent;
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
    
    displayApplianceTag(appliances);

    applianceInput.addEventListener('keyup', function(e) {
      let input = e.target.value.toLowerCase();
      let newApplianceArray = applianceArray.filter(appliance => appliance.toLowerCase().includes(input))
      //console.log(newApplianceArray);
      applianceItems.innerHTML = '';
      for (let i = 0; i < newApplianceArray.length; i++) {
        applianceItems.insertAdjacentHTML('beforeend',
                `<li><a class="dropdown-item" href="#">${newApplianceArray[i]}</a></li>`);
      }
      appliances = Array.from(
        document.getElementsByClassName('dropdown-item')
      );
      displayApplianceTag(appliances)
    })
     
        //console.log(appliances)
         //displayTag(appliances);
  })

}