import React from "react";
import Table from "react-bootstrap/Table";
import '../App.css';

function RecipeTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Jméno</th>
          <th>Popis</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
        {props.recipeList.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td>{recipe.id}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RecipeTableList;