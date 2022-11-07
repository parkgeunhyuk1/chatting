import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {useLogoutUserMutation} from '../services/appApi'
const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser]= useLogoutUserMutation();
  const handleLogout=async(e)=>{
    e.preventDefault();
    await logoutUser(user);
    // 홈피로 간다.
    window.location.replace('/')
  }
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} style={{ width: 50, height: 50 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Nav.Link>
            )}

            <Nav.Link
              onClick={() => {
                navigate("/chat");
              }}
            >
              Chat
            </Nav.Link>
            {user && (
              <NavDropdown title={
                <>
                <img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objectFit: 'cover', borderRadius: '50%'}}/>
                {user.name}
                </>
              }id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  navigate("/chat");
                }}
              >
                Chat
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
