import React, { useContext, useState } from "react";
import Card from 'react-bootstrap/Card';
import IngredientList from "./IngredientList";
import RecipeForm from "./RecipeForm";
import Button from "react-bootstrap/Button";
import UserContext from "../UserProvider";

function Recipe(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const { isAuthorized } = useContext(UserContext);

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleEditClick = () => {
        if (props.recipe) {
            handleOpenEditModal();
        }
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (props.viewType === "grid-small") {
        return (
            <Card>
                <Card.Img variant={"top"} src={props.recipe.imgUri} />
                <Card.Body>
                    <div>
                        {props.recipe.name}
                    </div>
                    <div>
                        {props.recipe.description}
                    </div>
                </Card.Body>
            </Card>
        );
    } else if (props.viewType === "grid") {
        return (
            <Card>
                <Card.Img variant={"top"} src={props.recipe.imgUri} />
                <Card.Body>
                    <div>
                        {props.recipe.name}
                    </div>
                    <div>
                        {isExpanded ? props.recipe.description : `${props.recipe.description.substring(0, 200)}...`}
                    </div>
                    {props.recipe.description.length > 200 && (
                        <>
                            <Button onClick={handleToggleExpand}>
                                {isExpanded ? "Méně" : "Více"}
                            </Button>
                            {isExpanded && (
                                <div>
                                    <IngredientList
                                        ingredientList={props.recipe.ingredients}
                                        ingredientsList={props.ingredientsList}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {isAuthorized && (
                        <Button onClick={handleEditClick}>Upravit recept</Button>
                    )}
                    <RecipeForm
                        recipe={props.recipe}
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        ingredientList={props.ingredientsList}
                        handleOpenEditModal={handleOpenEditModal}
                    />
                </Card.Body>
            </Card>
        );
    }
}

export default Recipe;
