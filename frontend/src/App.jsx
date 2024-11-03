import React from 'react';
import Navbar from './Navbar';
import { Route,Routes,useNavigate } from 'react-router-dom';
import Home from './Home';
import RecipesPage from './RecipesPage';
import RecipePage from './RecipePage';
import RecipeNotFound from './RecipeNotFound';
export default function App() {
    const Navigate = useNavigate();
    return (<>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/recipe' element={<RecipesPage/>}/>
          <Route path='/recipe/:id' element={<RecipePage/>}/>
          <Route path="/recipe/not-found" element={<RecipeNotFound />} />
          <Route path="/not-found" element={<RecipeNotFound />} />
        </Routes>
    </>)
}