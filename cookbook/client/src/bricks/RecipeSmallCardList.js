import React from "react";
import RecipeSmallCard from "./RecipeSmallCard";
import { Col, Row } from 'react-bootstrap';
import '../App.css';

function RecipeSmallList(props) {
  return (
    <Row>
      {props.recipeList.map((recipe) => (
        <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <RecipeSmallCard recipe={recipe}  ingredientList={props.ingredientList} />
        </Col>
      ))}
    </Row>
  );
}

export default RecipeSmallList;