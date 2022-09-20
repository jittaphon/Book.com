import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "boxicons";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import {removeCustomer, setCustomer} from "../ActionAndStore/Customer/action";
function Navbar_list({ className }) {
  const dispatch = useDispatch();
	const customer = useSelector((state) => state.customers);

  React.useEffect(() => {
		dispatch(setCustomer(JSON.parse(localStorage.getItem("token"))));
	}, [dispatch]);

  function logOut() {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
    localStorage.removeItem("id");
		dispatch(removeCustomer());
	}

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ROXY BOOK SEARCH</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/cart">
                <box-icon name="shopping-bag" color="#fff">
                </box-icon></Nav.Link>
            </Nav>
            <Nav>

            <Nav.Link href={customer ? "/" : "/login"}>{customer ? localStorage.getItem(`name`) : "เข้าสู่ระบบ"}</Nav.Link>
             
            {customer ? (
            <Nav.Link href="/" onClick={logOut}>Logout</Nav.Link>
            ) : null}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
Navbar_list.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Navbar_list)`
  font-family: "IBM Plex Sans Thai", sans-serif;
  position: relative;
  .brand {
    font-size: 26px;
    font-weight: normal;
  }
  .nav-right {
    display: flex;
    margin-top: 0;
    a {
      padding: 10px 15px;
    }
  }

`;
