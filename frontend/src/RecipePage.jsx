import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from './apicall';
import Loading from './Loading';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe,setRecipe] = useState({
    "_id": "12345",
    "author": "DeeDee",
    "cook_time_minutes": 45,
    "description": "Dough needs to rise overnight.",
    "ingredients": [
      "1 cup rolled oats",
      "1/2 cup molasses",
      "1/3 cup vegetable oil",
      "1 teaspoon salt",
      "1 1/2 cups boiling water",
      "2 tablespoons active dry yeast",
      "1/2 cup lukewarm water (100 degrees F/38 degrees C)",
      "1 cup whole wheat flour",
      "5 cups bread flour",
      "2 eggs"
    ],
    "instructions": [
      "Combine oats, molasses, oil, salt and boiling water. Let cool to about 105 degrees F.",
      "Dissolve the yeast in the warm water and let stand for 5 minutes or until creamy. Stir the yeast into oat mixture and mix well. Add whole wheat flour, 2 cups bread flour, and the eggs. Mix until well combined.",
      "Stir in enough of the remaining flour to make a soft dough. Turn dough out to a floured counter and knead for about 10 minutes. Place the dough in a well-greased bowl and cover with greased plastic wrap. Let the dough rest in the refrigerator overnight.",
      "Preheat oven to 375 degrees F (190 degrees C). Grease 3 regular loaf pans and 4 mini loaf pans.",
      "Transfer the dough onto a floured surface and divide it into 4 pieces. Shape the dough into loaves and place them in the pans, seam-side down. Let rise until doubled, about 90 minutes. Bake in the preheated oven until the loaves are golden brown and sound hollow when tapped, about 30 minutes."
    ],
    "prep_time_minutes": 30,
    "rating_stars": 4.59,
    "review_count": 29,
    "title": "Oatmeal Bread I"
  });
  const [isLoading,setIsLoading] = useState(false);
  
  const getRecipe = async () => {
    setIsLoading(true);
    const recipe = await fetchRecipeById(id);
    console.log(recipe);
    setRecipe(recipe);
    setIsLoading(false);
  }


  useEffect(()=>{
    console.log('started');
    getRecipe();
    console.log('ended');
  },[])
  

  return ((isLoading)?<Loading/>:(
    <div className="recipe-container">
      <header className="recipe-header">
        <h1>{recipe.title}</h1>
        <p className="description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-icon">👤</span>
            <span>{recipe.author}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏲️</span>
            <span>Prep: {recipe.prep_time_minutes}min</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">🍳</span>
            <span>Cook: {recipe.cook_time_minutes}min</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⭐</span>
            <span>{recipe.rating_stars}/5</span>
          </div>
        </div>
      </header>

      <div className="recipe-content">
        <section className="recipe-card ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="recipe-card instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </section>
      </div>

    </div>
  ));
};

export default RecipePage;