import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "./Card";
import Loading from "./Loading";
import { fetchRecipeByName, fetchRecipes } from "./apicall";

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef(null);
  const limit = 12;

  const loadFn = async ({ pageParam = 0, queryKey }) => {
    const [, query] = queryKey;
    if (query) {
      return fetchRecipeByName(
        import.meta.env.VITE_PUBLIC_BACKEND_URL,
        query,
        pageParam,
        limit
      );
    } else {
      return fetchRecipes(
        import.meta.env.VITE_PUBLIC_BACKEND_URL,
        pageParam,
        limit
      );
    }
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["recipes", searchQuery],
    queryFn: loadFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < limit ? undefined : pages.length * limit,
  });

  const allRecipes = data?.pages.flat() || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="first-scroll">
        <div className="content">
          <h2 className="rhead">Hungry?</h2>
          <p className="rsub">Look for the best recipes around!</p>
        </div>
      </div>

      <div className="search-hold">
        <div className="search-container">
          <div className="form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="search-input"
              onKeyDown={(e) => e.key === "Enter" && refetch()}
            />

            <button
              type="button"
              className="search-button"
              onClick={() => refetch()}
            >
              🔍
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="food_cards">
        {allRecipes.map((recipe) => (
          <Card
            key={recipe._id}
            recipe_id={recipe._id}
            img_url={recipe.photo_url}
            author={recipe.author}
            food_name={recipe.title}
            ratings={recipe.rating_stars}
          />
        ))}

        <div ref={observerRef}>
          {isLoading && <Loading />}
        </div>

        {!hasNextPage && allRecipes.length > 0 && (
          <div>No more recipes to load</div>
        )}
      </div>
    </>
  );
}
