import React from "react";
import Recipe from "./Recipe";

function RecipeList(props) {
    return (
        <div class="row">
            {props.recipeList.map((recipe) => {
                return (
                    <div
                        class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                        style={{ paddingBottom: "16px" }}
                    >
                        <Recipe key={recipe.id} recipe={recipe} ingredientsList={props.ingredientsList} viewType={props.viewType}/>
                    </div>
                );
            })}
        </div>
    );
}

export default RecipeList;