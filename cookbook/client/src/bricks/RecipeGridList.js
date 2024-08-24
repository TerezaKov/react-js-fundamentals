import React from "react";
import Recipe from "./Recipe";

function RecipeGridList(props) {
    return (
      <div class="row">
        {props.recipeList.map((recipe) => {
          return (
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
              style={{ paddingBottom: "16px" }}
            >
              <Recipe key={recipe.id} recipe={recipe} />
            </div>
          );
        })}
      </div>
    );
}

export default RecipeGridList;