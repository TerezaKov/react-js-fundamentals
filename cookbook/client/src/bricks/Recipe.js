import React from "react";

function Recipe(props) {
  return (
    <div key={props.recipe.id}>
        <div>{props.recipe.name}</div>
    </div>
  );
}

export default Recipe;