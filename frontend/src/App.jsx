import React from 'react';
import Navbar from './Navbar';
import { Route,Routes} from 'react-router-dom';
import Home from './Home';
import RecipesPage from './RecipesPage';
import RecipePage from './RecipePage';
export default function App() {
 
    return (<>
        <Navbar/>
        <Routes>
          <Route path='/Recipe-app' element={<Home/>}/>
          <Route path='/Recipe-app/recipe' element={<RecipesPage/>}/>
          <Route path='/Recipe-app/recipe/:id' element={<RecipePage/>}/>
        </Routes>
    </>)
}