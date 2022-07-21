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
    ingredientInput.style.display = 'block';
    ingredientInput.style.width = '667px';
    arrowUpIngredient.style.display = 'block';
    ingredientLabel.style.display = 'none';
    ingredientItems.style.display = 'flex';
  });

  // Listner in appliance drop-down button
  applianceLabel.addEventListener('click', () => {
    applianceInput.style.display = 'block';
    applianceInput.style.width = '667px';
    arrowUpAppliance.style.display = 'block';
    applianceLabel.style.display = 'none';
    applianceItems.style.display = 'flex';
  });

  // Listener in ustensil drop-down button
  ustensilLabel.addEventListener('click', () => {
    ustensilInput.style.display = 'block';
    ustensilInput.style.width = '667px';
    arrowUpUstensil.style.display = 'block';
    ustensilLabel.style.display = 'none';
    ustensilItems.style.display = 'flex';
  });
}


export function closeTagDropDownMenu() {

  arrowUpIngredient.addEventListener('click', () => {
    ingredientInput.style.display = 'none';
    ingredientItems.style.display = 'none';
    arrowUpIngredient.style.display = 'none';
    ingredientLabel.style.display = 'block';
    ingredientInput.value = '';
  });

  arrowUpAppliance.addEventListener('click', () => {
    applianceInput.style.display = 'none';
    applianceItems.style.display = 'none';
    arrowUpAppliance.style.display = 'none';
    applianceLabel.style.display = 'block';
  });

  arrowUpUstensil.addEventListener('click', () => {
    ustensilInput.style.display = 'none';
    ustensilItems.style.display = 'none';
    arrowUpUstensil.style.display = 'none';
    ustensilLabel.style.display = 'block';
  });
}