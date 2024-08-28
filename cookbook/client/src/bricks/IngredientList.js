import React from "react";
import Ingredient from "./Ingredient";

function IngredientList(props) {
    function getIngredientList(ingredientList) {
        return ingredientList.map((ing) => {
            return <Ingredient key={ing.id}
                               ing={ing}
                               ingredientsList={props.ingredientsList}/>;
        });
    }

    return getIngredientList(props.ingredientList);
}

export default IngredientList;