import React, { useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <Button
            variant="outline-primary"
            onClick={() =>
              setViewType((currentState) => {
                if (currentState === "grid") return "table";
                else return "grid";
              })
            }
          >
            <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
            {isGrid ? "Tabulka" : "Grid"}
          </Button>
        </div>
      </Navbar>
      {isGrid ? (
        <RecipeGridList studentList={props.studentList} />
      ) : (
        <RecipeTableList studentList={props.studentList} />
      )}
    </div>
  );
}

export default RecipeList;