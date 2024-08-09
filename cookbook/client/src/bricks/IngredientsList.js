import React from "react";
import Ingredient from "./Ingredient";

function IngredienceList(props) {
  function getIngredienceList(ingredienceList) {
  return ingredienceList.map((ingredience) => {
    return <Ingredient key ={ingredience.id} ingredience = {ingredience} />
  });
  }
  return getIngredienceList(props.ingredienceList);
}

export default IngredienceList;