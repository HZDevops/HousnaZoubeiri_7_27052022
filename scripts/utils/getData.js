/**
 * Get recipe data from database
 * @returns {Object}
 **/
function getData() {
  return fetch('/data/recipes.json')
    .then((res) => res.json())
    .catch((err) => console.log('an error occurs', err));
}

/**
 * Get an array of recipes
 * @returns {Array}
 **/
export async function getRecipes() {
  const data = await getData();
  return data.recipes;
}
