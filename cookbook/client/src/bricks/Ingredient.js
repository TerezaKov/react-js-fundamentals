import React from "react";

function Ingredient(props) {
  return (
    <div key={props.ingredients.id}>
        <div>{props.ingredients.name}</div>
    </div>
  );
}

export default Ingredient;