import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import '../App.css';

function Recipe(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
      setIsExpanded(!isExpanded);
  };

  return (
    <Card className="recipe-card">
        <Card.Img className="cardImg" variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
        <Card.Body className="cardBody">
            <Card.Title className="cardTitle">{props.recipe.name}</Card.Title>
            <Card.Text className="cardText">
                {isExpanded ? props.recipe.description : `${props.recipe.description.substring(0, 200)}...`}
            </Card.Text>
            {props.recipe.description.length > 200 && (
                <Button className="seeMore-btn" onClick={handleToggleExpand}>
                    {isExpanded ? "Méně" : "Více"}
                </Button>
            )}
        </Card.Body>
    </Card>
);
}

export default Recipe;