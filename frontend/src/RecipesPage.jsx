import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchRecipeByName, fetchRecipes } from './apicall';
import Card from './Card';
import Loading from './Loading';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const limit = 12;


  const handleSearch = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (searchQuery.trim()) {
        const newRecipes = await fetchRecipeByName(searchQuery,skip, limit);
      
        // If no new recipes or less recipes than limit, we've reached the end
        if (!newRecipes || newRecipes.length < limit) {
          setHasMore(false);
        }

        if (newRecipes && newRecipes.length > 0) {
          setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
          setSkip(prevSkip => prevSkip + limit);
        }
        
        setShowCards(true);
        }
      
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (searchQuery.length) {
        setRecipes([]);
        handleSearch();
      }
    }
  };



  useEffect(() => {
    if (!searchQuery.length) {
      loadMoreRecipes();
    } 
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          if (!searchQuery.length) {
            loadMoreRecipes();
          } else {
            handleSearch();
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '20px'
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasMore]);

  const loadMoreRecipes = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newRecipes = await fetchRecipes(skip, limit);
      
      // If no new recipes or less recipes than limit, we've reached the end
      if (!newRecipes || newRecipes.length < limit) {
        setHasMore(false);
      }

      if (newRecipes && newRecipes.length > 0) {
        setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
        setSkip(prevSkip => prevSkip + limit);
      }
      
      setShowCards(true);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='first-scroll'>
        <div className='content'>
          <h2 className='rhead'>Hungry?</h2>
          <p className='rsub'>Look for the best recipes around!</p>
        </div>
      </div>
      <div className='search-hold'>
      <div className="search-container">
          <div className='form'>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="search-input"
              onKeyDown={handleKeyPress}
            />
            <button type="button" className="search-button" onClick={()=>{setRecipes([]);handleSearch();}}>
              <span className="search-icon">🔍</span>
            </button>
          </div>
        </div>
        </div>
      <div className='food_cards'>
        {showCards && recipes.map((recipe, index) => (
          <Card
            key={index + 1}
            recipe_id={recipe._id}
            img_url={recipe.photo_url}
            author={recipe.author}
            food_name={recipe.title}
            ratings={recipe.rating_stars}
          />
        ))}
        
        {/* Loading indicator and observer target */}
        <div ref={observerTarget} className="w-full">
          {isLoading && <Loading />}
        </div>

        {/* No more recipes message */}
        {!hasMore && recipes.length > 0 && (
          <div>
            No more recipes to load
          </div>
        )}
      </div>
    </>
  );
}