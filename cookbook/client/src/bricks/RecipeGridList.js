import React from "react";
import { Col, Row } from 'react-bootstrap';
import Recipe from "./Recipe";

function RecipeGridList(props) {
  return props.recipeList.map((recipe) => {
    return <Row>
    {props.recipeList.map((recipe) => (
      <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
        <Recipe recipe={recipe} />
      </Col>
    ))}
  </Row>
  });
}

export default RecipeGridList;