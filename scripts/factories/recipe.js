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
      let ingredientBloc = document.createElement('li');
      const ingredientItem = document.createElement('span');
      const ingredientQuantity = document.createElement('span');
      const ingredientUnit = document.createElement('span');

      ingredientItem.classList.add('ingredient');
      ingredientBloc.appendChild(ingredientItem);
      ingredientBloc.appendChild(ingredientQuantity);
      ingredientBloc.appendChild(ingredientUnit);

      if(!ingredient.quantity && !ingredient.unit) {
        ingredientItem.innerHTML = `${ingredient.ingredient}`
      } else if (!ingredient.unit) {
        ingredientItem.innerHTML = `${ingredient.ingredient}`
        ingredientQuantity.innerHTML = `: ${ingredient.quantity}`;
      } else {
        ingredientItem.innerHTML = `${ingredient.ingredient}`;
        ingredientQuantity.innerHTML = `: ${ingredient.quantity}`;
        ingredientUnit.innerHTML = ` ${ingredient.unit}`; 
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
                    <div class="card-heading">
                      <h5 class="card-title">${name}</h5>
                      <h5 class="recipe-time fw-bold"><i class="bi bi-clock"></i>${time}min</h5>
                    </div>
                    <div class="card-detail">
                      <ul id=${id} class="recipe-ingredient"></ul>
                      <p class="card-text">${description}</p>
                    </div>
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