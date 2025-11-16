import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

export default function Card({ img_url, food_name, author, ratings, recipe_id }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(img_url || FALLBACK);

  function handleClick() {
    navigate(`/recipe/${recipe_id}`);
  }

  function handleError() {
    if (src !== FALLBACK) setSrc(FALLBACK);
  }

  return (
    <div className="food_card" onClick={handleClick}>
      <div className="food_image">
        <img
          src={src}
          alt={food_name || "recipe"}
          className={`img_url ${loaded ? "loaded" : "loading"}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
        {!loaded && <div className="img_placeholder" aria-hidden="true" />}
      </div>

      <div className="food_text">
        <p className="author-name">{author}</p>
        <p className="food-name">{food_name}</p>
        <p className="ratings">{ratings}</p>
      </div>
    </div>
  );
}
