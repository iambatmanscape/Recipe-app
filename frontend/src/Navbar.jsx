import React,{useState} from 'react';
import {Link,useLocation} from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    let navStyle = {};

    if (location.pathname === '/Recipe-app/recipe') {
        navStyle = {backgroundColor:'orange'}
    };

    return (<nav style={navStyle}>
        <img src='./logo.png'/>
        <div className='nav-options'>
            <ul>
                <li><Link to='/Recipe-app' className='links'>Home</Link></li>
                <li><Link to='/Recipe-app/recipe' className='links'>Recipes</Link></li>
            </ul>
        </div>
    </nav>)
}