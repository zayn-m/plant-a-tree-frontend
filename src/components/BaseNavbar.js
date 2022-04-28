import React, { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import Context from "../context/Context";

export default function BaseNavbar() {
  const { cartItems } = useContext(Context);

  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (token) return true;
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/shop">Shop</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact">Contact Us</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            {!localStorage.getItem("token") ? (
              <React.Fragment>
                <Nav.Link>
                  <Link to="/signup">Sign Up</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link>
                  <Link to="/cart">
                    <FaCartPlus />
                    {cartItems.length ? (
                      <Badge className="ms-1" bg="danger">
                        {cartItems?.length}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Link>
                </Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item className="text-black" href="#">
                    <Nav.Link>
                      <Link to="/orders">My Orders</Link>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                  <Nav.Link>
                      <Link to="/admin/plants">Manage</Link>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
