import React, {useEffect, useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const defaultIngredient = { id: "", amount: "", unit: "" };

const RecipeForm = ({ recipe, showModal, setShowModal, ingredientList, handleUpdateRecipeList }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imgUri: "",
        ingredients: [],
    });

    const [validated, setValidated] = useState(false);
    const [recipeAddCall, setRecipeAddCall] = useState({ state: "inactive" });

    const handleFieldChange = (name, value, index = null) => {
        if (name.startsWith("ingredients.")) {
            const [prop, subIndex, subProp] = name.split(".");
            const updatedIngredients = [...formData.ingredients];

            if (subProp === 'id') {
                updatedIngredients[index] = {
                    ...updatedIngredients[index],
                    [subProp]: value,
                };
            } else {
                updatedIngredients[index] = {
                    ...updatedIngredients[index],
                    [subProp]: subProp === 'amount' ? Number(value) : value,
                };
            }

            setFormData((prevData) => ({
                ...prevData,
                ingredients: updatedIngredients,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleAddIngredient = () => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: [...prevData.ingredients, { ...defaultIngredient }],
        }));
    };

    const handleRemoveIngredient = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            const payload = {
                ...formData,
            };

            if (recipe) {
                payload.id = recipe.id;
            }

            console.log(payload);
            setRecipeAddCall({ state: "pending" });

            try {
                const result = await fetch(`http://localhost:3000/recipe/${recipe ? "update" : "create"}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const data = await result.json();

                if (result.status >= 400) {
                    setRecipeAddCall({ state: "error", error: data });
                } else {
                    setRecipeAddCall({ state: "success", data });
                    handleCloseModal();
                }
            } catch (error) {
                console.error("Error:", error);

                if (error instanceof Response) {
                    const responseData = await error.json();
                    console.log("Response Data:", responseData);
                }

                setRecipeAddCall({ state: "error", error: { errorMessage: error.message } });
            }
        }

        setValidated(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ name: "", description: "", imgUri: "", ingredients: [] });
        handleUpdateRecipeList();
    };


    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name || "",
                description: recipe.description || "",
                imgUri: recipe.imgUri || "",
                ingredients: recipe.ingredients ? [...recipe.ingredients] : [],
            });
        } else {
            setFormData({
                name: "",
                description: "",
                imgUri: "",
                ingredients: [],
            });
        }
    }, [recipe]);

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{recipe ? "Upravit" : "Přidat"} recept</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Název</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleFieldChange("name", e.target.value)}
                                minLength={5}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Minimální délka pro název je 5 znaků
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Popis</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleFieldChange("description", e.target.value)}
                                maxLength={500}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte popis s maximální délkou 500 znaků
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL Obrázku</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.imgUri}
                                onChange={(e) => handleFieldChange("imgUri", e.target.value)}
                                minLength={5}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Seznam ingrediencí</Form.Label>
                            {formData.ingredients.map((ingredient, index) => (
                                <div key={index}>
                                    <Form.Control
                                        as="select"
                                        value={ingredient.id}
                                        onChange={(e) => handleFieldChange(`ingredients.${index}.id`, e.target.value, index)}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                            Vyberte ingredienci
                                        </option>
                                        {ingredientList.map((ingredientOption, optionIndex) => (
                                            <option key={optionIndex} value={ingredientOption.id}>
                                                {ingredientOption.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control
                                        type="number"
                                        placeholder="Množství"
                                        value={ingredient.amount}
                                        onChange={(e) => handleFieldChange(`ingredients.${index}.amount`, e.target.value, index)}
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Jednotka"
                                        value={ingredient.unit}
                                        onChange={(e) => handleFieldChange(`ingredients.${index}.unit`, e.target.value, index)}
                                        required
                                    />
                                </div>
                            ))}
                            <Form.Control.Feedback type="invalid">Něco vyberte</Form.Control.Feedback>
                        </Form.Group>
                        <Button onClick={handleAddIngredient}>Přidat ingredienci</Button>
                        <Button onClick={() => handleRemoveIngredient(formData.ingredients.length - 1)}>
                            Odstranit ingredienci
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row justify-content-between align-items-center w-100">
                            <div>
                                {recipeAddCall.state === "error" && (
                                    <div className="text-danger">Error: {recipeAddCall.error.errorMessage}</div>
                                )}
                            </div>
                            <div className="d-flex flex-row gap-2">
                                <Button className="btn btn-sm" variant="secondary" onClick={handleCloseModal}>
                                    Zavřít
                                </Button>
                                <Button
                                    type="submit"
                                    style={{ float: "right" }}
                                    variant="primary"
                                    disabled={recipeAddCall.state === "pending"}
                                >
                                    {recipeAddCall.state === "pending" ? (
                                        <Icon size={0.8} path={mdiLoading} spin={true} />
                                    ) : (
                                        recipe ? "Upravit" : "Přidat"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default RecipeForm;
