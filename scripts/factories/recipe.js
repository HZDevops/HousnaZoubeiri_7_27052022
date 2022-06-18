export function recipeFactory(recipe) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = recipe;

  //Get ingredients list
  function getIngredientList() {
    let ingredientArray = []

    ingredients.forEach((ingredient) => {
        const ingredientBloc = document.createElement('span')
        ingredientBloc.classList.add('ingredient')
        ingredientBloc.innerHTML = `${ingredient.ingredient}: ${ingredient.quantity}${ingredient.unit}`
        ingredientArray.push (ingredientBloc)
    })
    return ingredientArray
  }
  
  //Create recipe card
  function getRecipeCardDOM() {

      const card = document.createElement('a')
      
      card.classList.add('recipe-card')
     
      const recipeCard = `
                <div class="recipe-image"></div>
                <div class="recipe-title">
                  <span class="recipe-name">${name}</span>
                  <span class="recipe-time">${time}</span>
                </div>
                <div id=${id} class="recipe-ingredient"></div>
                <p class="recipe-description">${description}</p>
              `;
      card.innerHTML = recipeCard
      return { card, id }
  }

  return {
    getRecipeCardDOM,
    getIngredientList,
  }
}