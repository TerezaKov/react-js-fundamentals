import React from "react";
import Ingredient from "./Ingredient";

function IngredientsList(props) {
  function getIngredientsList(ingredientsList) {
  return ingredientsList.map((ingredients) => {
    return <Ingredient key ={ingredients.id} ingredients = {ingredients} ingredientsList={props.ingredientsList} />
  });
  }
  return getIngredientsList(props.ingredientsList);
}

export default IngredientsList;