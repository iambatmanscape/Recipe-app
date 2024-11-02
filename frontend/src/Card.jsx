import React from "react";
import { useNavigate } from 'react-router-dom'; 

export default function Card({ img_url,food_name,author,ratings,recipe_id }) {
    
    const navigator = useNavigate();

    async function handleClick() {
        navigator(`/Recipe-app/recipe/${recipe_id}`)
      }

    return (<div className="food_card" onClick={handleClick}>
        <div className="food_image">
            <img src={img_url} className="img_url"/>
        </div>
        <div className="food_text">
            <p className="author-name">{author}</p>
            <p className="food-name">{food_name}</p>
            <p className="ratings">{ratings}</p>
        </div>
    </div>)
}