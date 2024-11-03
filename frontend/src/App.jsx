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
          <Route path='/Recipe-app' element={<Home/>}/>
          <Route path='/Recipe-app/recipe' element={<RecipesPage/>}/>
          <Route path='/Recipe-app/recipe/:id' element={<RecipePage/>}/>
          <Route path="/Recipe-app/recipe/not-found" element={<RecipeNotFound />} />
          <Route path="/Recipe-app/not-found" element={<RecipeNotFound />} />
        </Routes>
    </>)
}