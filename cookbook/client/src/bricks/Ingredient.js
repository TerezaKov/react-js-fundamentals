import React from "react";

function Ingredient(props) {
  return (
    <div key={props.ingredience.id}>
        <div>{props.ingredience.name}</div>
    </div>
  );
}

export default Ingredient;