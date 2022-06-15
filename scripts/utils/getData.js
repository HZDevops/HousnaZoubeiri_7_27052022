// Get recipes data
export async function getData() {
  return fetch('/data/recipes.json')
    .then((res) => res.json())
    .catch((err) => console.log('an error occurs', err));
}
