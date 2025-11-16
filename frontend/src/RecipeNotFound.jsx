import React from 'react';

const ChefHat = () => (
  <div className="chef-hat">
    <div className="hat-top"></div>
    <div className="hat-base"></div>
  </div>
);

const Utensils = () => (
  <div className="utensils">
    <div className="fork"></div>
    <div className="knife"></div>
  </div>
);

const HomeIcon = () => (
  <div className="home-icon">
    <div className="roof"></div>
    <div className="base"></div>
  </div>
);

const RecipeNotFound = () => {

  return (
    <>
      <div className="page-container">
        <div className="content">
          <div className="icon-container">
            <ChefHat />
            <Utensils />
          </div>
          
          <h1 className="title">
            Oops! Recipe or Page Not Found
          </h1>
          
          <p className="subtitle">
            Looks like this recipe got lost in the kitchen! Our chef is still working on perfecting this dish.
          </p>
          
          <div className="suggestion-box">
            <h2 className="suggestion-title">
              While you're here, why not try:
            </h2>
            <ul className="suggestion-list">
              <li>Checking the spelling of your URL</li>
              <li>Browsing our featured recipes</li>
              <li>Using the search bar above</li>
              <li>Starting fresh from our homepage</li>
            </ul>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="home-button"
          >
            <HomeIcon />
            Return to Homepage
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeNotFound;