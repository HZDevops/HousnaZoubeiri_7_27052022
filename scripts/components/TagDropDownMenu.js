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

export function openTagDropDownMenu() {
  
  // Listener in ingredient drop-down button
  ingredientLabel.addEventListener('click', () => {
    //Close appliance drop-down menu before opening ingredient drop-down menu
    closeApplianceDropDownMenu();

    //Close ustensil drop-down menu before opening ingredient drop-down menu
    closeUstensilDropDownMenu();

    //Open ingredient drop-down menu
    ingredientInput.style.display = 'block';
    ingredientInput.style.width = '667px';
    arrowUpIngredient.style.display = 'block';
    ingredientLabel.style.display = 'none';
    ingredientItems.style.display = 'flex';
  });

  // Listner in appliance drop-down button
  applianceLabel.addEventListener('click', () => {
    //Close ingredient drop-down menu before opening appliance drop-down menu
    closeIngredientDropDownMenu();

    //Close ustensil drop-down menu before opening appliance drop-down menu
    closeUstensilDropDownMenu();

    //Open appliance drop-down menu
    applianceInput.style.display = 'block';
    applianceInput.style.width = '667px';
    arrowUpAppliance.style.display = 'block';
    applianceLabel.style.display = 'none';
    applianceItems.style.display = 'flex';
  });

  // Listener in ustensil drop-down button
  ustensilLabel.addEventListener('click', () => {
    //Close ingredient drop-down menu before opening ustensil drop-down menu
    closeIngredientDropDownMenu();

    //Close appliance drop-down menu before opening ustensil drop-down menu
    closeApplianceDropDownMenu();

    //Open ustensil drop-down menu
    ustensilInput.style.display = 'block';
    ustensilInput.style.width = '667px';
    arrowUpUstensil.style.display = 'block';
    ustensilLabel.style.display = 'none';
    ustensilItems.style.display = 'flex';
  });
}

//Close all drop-down menus
export function closeTagDropDownMenu() {

  arrowUpIngredient.addEventListener('click', () => {
    closeIngredientDropDownMenu ()
  });

  arrowUpAppliance.addEventListener('click', () => {
    closeApplianceDropDownMenu ();
  });

  arrowUpUstensil.addEventListener('click', () => {
    closeUstensilDropDownMenu ();
  });
}

// Close ingredient drop-down menu
function closeIngredientDropDownMenu() {
  ingredientInput.style.display = 'none';
  ingredientItems.style.display = 'none';
  arrowUpIngredient.style.display = 'none';
  ingredientLabel.style.display = 'block';
}

// Close appliance drop-down menu
function closeApplianceDropDownMenu () {
  applianceInput.style.display = 'none';
  applianceItems.style.display = 'none';
  arrowUpAppliance.style.display = 'none';
  applianceLabel.style.display = 'block';
}

// Close ustensil drop-down menu
function closeUstensilDropDownMenu () {
  ustensilInput.style.display = 'none';
  ustensilItems.style.display = 'none';
  arrowUpUstensil.style.display = 'none';
  ustensilLabel.style.display = 'block';
}