import React from 'react';
import {Link} from 'react-router-dom';
export default function Navbar() {
    return (<nav>
        <img src='./logo.png'/>
        <div className='nav-options'>
            <ul>
                <li><Link to='/Recipe-app' className='links'>Home</Link></li>
                <li><Link to='/Recipe-app/recipe' className='links'>Recipes</Link></li>
            </ul>
        </div>
    </nav>)
}