import React, { useState, useRef, useEffect } from 'react';
import call from './apicall';
import Card from './Card';
import Loading from './Loading';
import img from './assets/rimg.jpg'

export default function RecipesPage() {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (recipes.length > 0) {
      setIsLoading(false);
    }
  }, [recipes]);

  function handleChange({ target }) {
    setInput(target.value);
  }

  async function output() {
    setIsLoading(true);
    const data = await call(input);
    setRecipes(data);
    setShowCards(true);
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
          <div className='cards' ref={targetRef}>
            {isLoading ? <Loading /> : recipes.map((recipe, index) => (
              // <Card img_url={img} author={"Author"} food_name={"Special Food"} ratings={5}/>
              <div>{recipe}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


{/* <Card img_url={img} author={"Author"} food_name={"Special Food"} ratings={5}/> */}
