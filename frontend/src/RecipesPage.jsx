import React, { useState, useRef, useEffect } from 'react';
import { fetchRecipe,fetchRecipes } from './apicall';
import Card from './Card';
import Loading from './Loading';

export default function RecipesPage() {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    output()
  }, []);


  async function output() {
    setIsLoading(true);
    const data = await fetchRecipes(0,12);
    setRecipes(data);
    setShowCards(true);
    setIsLoading(false);
  }

  return (
    <>
      <div className='first-scroll'>
        <div className='content'>
          <h2 className='rhead'>Hungry?</h2>
          <p className='rsub'>Just Make Your Own Food!</p>
        </div>
      </div>
      <div className='food_cards'>
  {showCards && (
    isLoading ? (
      <Loading />
    ) : (
      recipes.map((recipe, index) => (
        <Card
          key={index + 1}
          img_url={recipe.photo_url}
          author={recipe.author}
          food_name={recipe.title}
          ratings={recipe.rating_stars}
        />
      ))
    )
  )}
</div>

    </>
  );
}


{/* <Card img_url={img} author={"Author"} food_name={"Special Food"} ratings={5}/> */}
