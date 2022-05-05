import React, { useContext, useState } from "react";
import { Container, Nav, NavDropdown, Navbar, Badge, Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import Context from "../context/Context";
import axios from '../config/axios.config';

export default function BaseNavbar() {
  const { cartItems } = useContext(Context);

  const [search, setSearch] = useState('');

  const history = useHistory();

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

  const searchPlants = (e) => {
    e.preventDefault();
    history.push(`/shop?search=${search}`);

    // axios.get(`/plants/search?q=${search}`)
    //   .then(res => {
    //     history.push({
    //       pathname: `/shop`,
    //       state: {
    //         data: res.data,
    //       },
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }

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
          <Form className="d-flex" onSubmit={searchPlants}>
            <FormControl
            type="search"
            placeholder="Search Plants..."
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>
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
