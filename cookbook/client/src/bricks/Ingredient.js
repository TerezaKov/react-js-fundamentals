import React from "react";

function Ingredient(props) {
    const ingredientData = props.ingredientsList.find(item => item.id === props.ing.id);
    const ingredientName = ingredientData ? ingredientData.name : " ";
    return (
        <div>
            <li>
                {ingredientName} ({props.ing.amount} {props.ing.unit})
            </li>
        </div>
    )
}

export default Ingredient;