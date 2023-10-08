import React, { useState, useRef, useEffect } from 'react';
import call from './apicall';
import Card from './Card';
import Loading from './Loading';

export default function RecipesPage() {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    // Stop the loader if the recipes state is not empty
    if (recipes.length > 0) {
      setIsLoading(false);
    }
  }, [recipes]);

  function handleChange({ target }) {
    setInput(target.value);
  }

  async function output() {
    // Start the loader
    setIsLoading(true);

    // Fetch the recipes
    const data = await call(input);

    // Set the recipes state
    setRecipes(data);

    // Show the cards
    setShowCards(true);
  }

  return (
    <>
      <div className='first-scroll'>
        <div className='content'>
          <h2 className='rhead'>Hungry?</h2>
          <p className='rsub'>Just Make Your Own Food!</p>
          <input
            className='inp'
            placeholder='Enter Your Favorite Food...'
            onChange={handleChange}
          />
          <button className='recipe-enter' onClick={output}>
            SEARCH <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#ffffff'/>
            </svg>
          </button>
        </div>
        <img src='./rimg.jpg' className='img-2' />
      </div>

      {showCards && (
        <div className='cards' ref={targetRef}>
          {isLoading ? <Loading /> : recipes.map((recipe, index) => (
            <Card
              key={index + 1}
              serial={index + 1}
              heading={recipe.title}
              method={recipe.instructions}
            />
          ))}
        </div>
      )}
    </>
  );
}

