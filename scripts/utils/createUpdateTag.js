//DOM elements
let tagContainer = document.querySelector('.tag-container');

/**
 * Create ingredient tag in tag section
 * @param {String} ingredientValue
 */
export function createIngredientTag(ingredientValue) {
  let ingredientTag = `<button type="button" class="btn ingredient-tag"><span class="ingredient-name tag"></span><i class="bi bi-x-circle ingredient-close"></i></div>`;
  tagContainer.insertAdjacentHTML('beforeend', ingredientTag);
  let ingredientName = document.querySelector('.ingredient-name');

  ingredientName.innerHTML = ingredientValue;
}

/**
 * Update ingredient tag in tag section
 * @param {String} ingredientValue
 */
export function updateIngredientTag(ingredientValue) {
  let ingredient = document.querySelector('.ingredient-name');

  ingredient.innerHTML = ingredientValue;
}

/**
 * Create appliance tag in tag section
 * @param {String} applianceValue
 */
export function createApplianceTag(tagValue) {
  let applianceTag = `<button type="button" class="btn appliance-tag"><span class="appliance-name tag"></span><i class="bi bi-x-circle appliance-close"></i></div>`;
  tagContainer.insertAdjacentHTML('beforeend', applianceTag);
  let applianceName = document.querySelector('.appliance-name');

  applianceName.innerHTML = tagValue;
}

/**
 * Update appliance tag in tag section
 * @param {String} applianceValue
 */
export function updateApplianceTag(applianceValue) {
  let appliance = document.querySelector('.appliance-name');

  appliance.innerHTML = applianceValue;
}

/**
 * Create ustensil tag in tag section
 * @param {String} ustensilValue
 */
export function createUstensilTag(ustensilValue) {
  let ustensilTag = `<button type="button" class="btn ustensil-tag"><span class="ustensil-name tag"></span><i class="bi bi-x-circle ustensil-close"></i></div>`;
  tagContainer.insertAdjacentHTML('beforeend', ustensilTag);

  let ustensilName = document.querySelector('.ustensil-name');
  ustensilName.innerHTML = ustensilValue;
}

/**
 * Update ustensil tag in tag section
 *  @param {String} ustensilValue
 */
export function updateUstensilTag(ustensilValue) {
  let ustensil = document.querySelector('.ustensil-name');

  ustensil.innerHTML = ustensilValue;
}
