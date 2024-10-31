import React from "react";

export default function Card({ img_url,food_name,author,ratings,recipe_id }) {
    return (<div className="food_card">
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