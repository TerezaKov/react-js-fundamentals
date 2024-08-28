import "./App.css";
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Container, Nav} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Outlet, useNavigate } from "react-router-dom";
import {mdiAlertOctagonOutline, mdiLoading} from "@mdi/js";
import Icon from "@mdi/react";
import UserContext from "./UserProvider";
import Button from "react-bootstrap/Button";

function App(){
    const { isAuthorized, toggleAuthorization } = React.useContext(UserContext);
    const [listRecipeCall, setListRecipeCall] = useState({
        state: "pending",
    });
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setListRecipeCall({ state: "error", error: responseJson });
            } else {
                setListRecipeCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    function getRecipeListDropdown() {
        switch (listRecipeCall.state) {
            case "pending":
                return (
                    <Nav.Link disabled={true}>
                        <Icon size={1} path={mdiLoading} spin={true} /> Recipe List
                    </Nav.Link>
                );
            case "success":
                return (
                    <NavDropdown title="Select Recipe" id="navbarScrollingDropdown">
                        {listRecipeCall.data.map((recipe) => {
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

    return(
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
                                <Button onClick={toggleAuthorization} variant={"success"}>
                                    Toggle Authorization
                                </Button>
                                {getRecipeListDropdown()}
                                <Nav.Link onClick={() => navigate("/recipeList")}>
                                    Recepty
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/ingredientList")}>
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