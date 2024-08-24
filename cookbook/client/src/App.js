import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from "./bricks/RecipeList"
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading, mdiAlertOctagonOutline  } from "@mdi/js";
import { Outlet, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
 const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setRecipeLoadCall({ state: "error", error: responseJson });
        } else {
          setRecipeLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setRecipeLoadCall({ state: "error", error });
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientLoadCall({ state: "error", error: responseJson });
        } else {
          setIngredientLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setIngredientLoadCall({ state: "error", error });
      });
  }, []);

  function getRecipeListDropdown() {
    switch (recipeLoadCall.state) {
      case "pending":
        return (
          <Nav.Link disabled={true}>
            <Icon size={1} path={mdiLoading} spin={true} /> Recipe List
          </Nav.Link>
        );
      case "success":
        return (
            <NavDropdown title="Select Recipe" id="navbarScrollingDropdown">
            {recipeLoadCall.data.map((recipe) => {
              return (
                <NavDropdown.Item
                  onClick={() =>
                    navigate("/recipeDetail?id=" + recipe.id)
                  }
                >
                  {recipe.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>

        );
         
        case "error":
          return (
            <div>
              <Icon size={1} path={mdiAlertOctagonOutline} /> Error
            </div>
          );
        default:
          return null;
      }
    }  

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            Hatchery Recepty
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Hatchery Recepty
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {getRecipeListDropdown()}
                <Nav.Link onClick={() => navigate("/recipeList")}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/ingredientsList")}>
                  Ingredience
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
