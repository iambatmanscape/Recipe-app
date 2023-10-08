import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
    return (<>
      <section className='home-page'>
         <h2 className='heading'>Find Your Favorite Recipes!</h2>
         <Link to='/recipe' style={{textDecoration:'none'}}><button className='to-recipe'>FIND RECIPES</button></Link>
      </section>

    </>)
}