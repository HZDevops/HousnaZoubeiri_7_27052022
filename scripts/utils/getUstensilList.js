/**
 * Get ustensils array
 * @param {Array} recipes
 * @returns {Array}
 */
export function getUstensilList(recipes) {
  let ustensilArray = [];
  recipes.forEach((recipe) => {
    let array = recipe.ustensils;
   
    for (let i = 0; i< array.length ;i++) {
      ustensilArray.push(array[i]);
    }
  });
  ustensilArray = ustensilArray.filter(
    (ele, pos) => ustensilArray.indexOf(ele) === pos
  );
  return (ustensilArray);
}
