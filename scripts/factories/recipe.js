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

  
  //Display ingredients list
  function displayIngredientList() {
    let ingredientArray = [];

    ingredients.forEach((ingredient) => {
      const ingredientBloc = document.createElement('li');
      ingredientBloc.classList.add('ingredient');

      if(!ingredient.quantity && !ingredient.unit) {
        ingredientBloc.innerHTML = `${ingredient.ingredient}`
      } else if (!ingredient.unit) {
        ingredientBloc.innerHTML = `${ingredient.ingredient}: ${ingredient.quantity}`
      } else {
        ingredientBloc.innerHTML = `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`
      }
        ingredientArray.push (ingredientBloc);
    })
    return ingredientArray;
  }
  
  //Create recipe card
  function getRecipeCardDOM() {

    const card = document.createElement('a')
      
    card.classList.add('recipe-card')
     
      const recipeCard = `
                <div class="card">
                  <div class="card-img-top"></div>
                  <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h5 class="recipe-time fw-bold">${time}min</h5>
                    <ul id=${id} class="recipe-ingredient"></ul>
                    <p class="card-text">${description}</p>
                  </div>
                </div>
              `;
      card.innerHTML = recipeCard
      return { card, id }
  }

  return {
    getRecipeCardDOM,
    displayIngredientList,
  }
}