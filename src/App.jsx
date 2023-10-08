import React from 'react';
import Navbar from './Navbar';
import { Route,Routes} from 'react-router-dom';
import Home from './Home';
import RecipesPage from './RecipesPage';
export default function App() {
 
    return (<>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/recipe' element={<RecipesPage/>}/>
        </Routes>
    </>)
}