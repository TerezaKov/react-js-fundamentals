import React, { useState, useMemo } from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeSmallCardList from "./RecipeSmallCardList";
import RecipeTableList from "./RecipeTableList";

import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiViewList, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const [searchBy, setSearchBy] = useState("");

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
  
  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
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
                className={`btn-style ${viewType === "grid" ? "btn-active" : ""}`}
                onClick={() => setViewType("grid")}
                variant="none"
              >
                <Icon size={1} path={mdiViewGridOutline} /> Velké karty
              </Button>

              <Button
                className={`btn-style ${viewType === "smallCards" ? "btn-active" : ""}`}
                onClick={() => setViewType("smallCards")}
                variant="none"
              >
                <Icon size={1} path={mdiViewList} /> Malé karty
              </Button>

              <Button
                className={`btn-style ${viewType === "table" ? "btn-active" : ""}`}
                onClick={() => setViewType("table")}
                variant="none"
              >
                <Icon size={1} path={mdiTable} /> Tabulka
              </Button>
            </Form>

          </div>
        </div>
      </Navbar>
      {viewType === "grid" && <RecipeGridList recipeList={filteredRecipeList} />}
      {viewType === "smallCards" && <RecipeSmallCardList recipeList={filteredRecipeList} ingredientList={props.ingredientList}/>}
      {viewType === "table" && <RecipeTableList recipeList={filteredRecipeList} />}
    </div>
  );
}

export default RecipeList;