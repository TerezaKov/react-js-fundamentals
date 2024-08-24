import React, { useState, useMemo } from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeSmallCardList from "./RecipeSmallCardList";
import RecipeTableList from "./RecipeTableList";


import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("Tabulka");
  const [searchBy, setSearchBy] = useState("");
  const viewTypes = ["Velké karty", "Malé karty", "Tabulka"];
  const isGrid = viewType === "Velká karty" || viewType === "Malé karty";

  const filteredRecipeList = useMemo(() => {

    return props.recipeList ? props.recipeList.filter((item) => {
      return (
        item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) ||
        item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    }) : [];
  }, [searchBy, props.recipeList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function getNextViewType() {
    const currentIndex = viewTypes.indexOf(viewType);
    if (currentIndex === viewTypes.length - 1) {
        setViewType(viewTypes[0])
    } else {
        setViewType(viewTypes[currentIndex + 1]);
    }
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

return (
    <div>
      <Navbar collapseOnSelect expand="sm">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "right" }}>
          <div>
          <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />

              <Button
                className="btn-search"
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>

              <Button
                  className={"d-none d-md-block"}     
                  variant="outline-primary"
                  onClick={getNextViewType}
                            >
                    <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                    {viewType}
              </Button>
            </Form>


               </div>
            </Navbar.Collapse>
        </div>
      </Navbar>
      {viewType === "Velké karty" && <RecipeGridList recipeList={filteredRecipeList} />}
      {viewType === "Malé karty" && <RecipeSmallCardList recipeList={filteredRecipeList} ingredientList={props.ingredientList}/>}
      {viewType === "Tabulka" && <RecipeTableList recipeList={filteredRecipeList} />}

    </div>
  );
}

export default RecipeList;