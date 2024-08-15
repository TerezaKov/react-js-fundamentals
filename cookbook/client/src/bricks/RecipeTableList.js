import React from "react";
import Table from "react-bootstrap/Table";

function RecipeTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Jméno</th>
          <th>Příjmení</th>
          <th>Rodné číslo</th>
        </tr>
      </thead>
      <tbody>
        {props.RecipeList.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>{recipe.ingredients}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RecipeTableList;