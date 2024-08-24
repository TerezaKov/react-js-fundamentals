import BrickRecipeList from "../bricks/RecipeList";
import CookbookInfo from "../bricks/CookbookInfo"
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import {Nav} from "react-bootstrap";


function RecipeList(){
    const cookbook = {
        name: "Kuchařka"
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const [repipesLoadCall, setRepipesLoadCall] = useState(
        {state: "pending"}
    );
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState(
        {state: "pending"}
    );

    useEffect(() => {
        if (repipesLoadCall.state === "pending") {
            fetch('//localhost:3000/recipe/list')
                .then((response) => response.json())
                .then((data) => {
                    setRepipesLoadCall({state: "success", data: data});
                })
                .catch((error) => {
                    setRepipesLoadCall({state: "error", error: error});
                });
        }
        if (ingredientsLoadCall.state === "pending") {
            fetch('//localhost:3000/ingredient/list')
                .then((response) => response.json())
                .then((data) => {
                    setIngredientsLoadCall({state: "success", data: data});
                })
                .catch((error) => {
                    setIngredientsLoadCall({state: "error", error: error});
                });
        }
    }, []);

    function getChild() {
        switch (repipesLoadCall.state && ingredientsLoadCall.state) {
            case "pending":
                return (
                    <div>
                        <Icon size={1} path={mdiLoading} spin={true} /> Recipe List
                    </div>
                );
            case "error":
                return <div>Error: {repipesLoadCall.error.message}</div>;
            case "success":
                return(
                    <BrickRecipeList searchTerm={searchTerm} recipeList={repipesLoadCall.data} ingredientsList={ingredientsLoadCall.data}/>
                );
        }
    }

    return(
        <div>
            <CookbookInfo cookbook={cookbook}/>
            {getChild()}
        </div>
    );
}

export default RecipeList;