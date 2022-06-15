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

  //Calculate total likes media
  function getIngredientList(ingredients) {
    let ingredientArray = []

    ingredients.forEach((ingredient) => {
      ingredientArray.push(ingredient)
    })

    console.log(ingredientArray)
  }
  //Create photographer media cards
  function getRecipeCardDOM() {

      const article = document.createElement('article');

      article.classList.add('recipe-card');

      const recipeCard = `
            <a href="#" class="recipe-link">
                <div class="recipe-image"></div>
                <div class="recipe-info">
                    <div class="recipe-title">
                        <span class="recipe-name">${name}</span>
                        <span class="recipe-time">${time}</span>
                    </div>
                    <p class="recipe-description">${description}</p>
                </div>
            </a>
            
         `;
      article.innerHTML = recipeCard;
      return article;
  }

  return {
    getRecipeCardDOM,
    getIngredientList,
  };
}