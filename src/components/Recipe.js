import React from "react";

const Recipe = ({title,image, calories, ingredients}) => {
    return (
        <div className="recipe">
            <h1 className="recipe-title">{title}</h1>
            <img className="recipe-img" src={image} alt="" />
            <p className="recipe-calories">Calories: {calories}</p>
            <ul> Ingredients
                    {ingredients.map(ingredient => (
                        <li>{ingredient.text}</li>
                    ))}
            </ul>
        </div>
    );
}
export default Recipe;