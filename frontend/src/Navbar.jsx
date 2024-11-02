import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/Recipe-app" className="nav-link">
          <span className="nav-text">Home</span>
        </Link>


        <Link to="/Recipe-app/recipe" className="nav-link">
          <span className="nav-text">Recipes</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;