import React from "react";

function Ingredient(props) {
  const ingredientData = props.ingredientsList.find(item => item.id === props.ingredient.id);
  const ingredientName = ingredientData ? ingredientData.name : " ";
  return (
    <div>
    
        {ingredientName} ({props.ingredient.amount} {props.ingredient.unit})
    
</div>
  )
}

export default Ingredient;