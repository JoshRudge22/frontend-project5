import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, ListGroup } from "react-bootstrap";
import navStyles from '../styles/NavBar.module.css';
import btnStyles from '../styles/Buttons.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const currentUser = useCurrentUser();
  const { setCurrentUser } = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/users/?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleProfileClick = (userId) => {
    setSearchResults([]);
    history.push(`/profile/${userId}`);
  };

  const loggedInIcons = currentUser ? (
    <>
      <NavLink className={navStyles.NavLink} to="/">
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink className={navStyles.NavLink} to="/">
        <i className="fa-solid fa-user"></i>Profile
      </NavLink>
      <NavLink className={navStyles.NavLink} to="/">
        <i className="far fa-plus-square"></i>Add post
      </NavLink>
      <NavLink className={navStyles.NavLink} to="/">
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={navStyles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
    </>
  ) : null;

  const loggedOutIcons = !currentUser && (
    <>
      <NavLink className={navStyles.NavLink} to="/signin">
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink to="/signup" className={navStyles.NavLink}>
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {loggedInIcons}
            {loggedOutIcons}
            <NavLink to="/" className={navStyles.NavLink}>
              <i className="fa-solid fa-file-contract"></i>Contact Us
            </NavLink>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <Button className={btnStyles.button} type="submit">Search</Button>
          </Form>
          {searchResults.length > 0 && (
            <ListGroup className={navStyles.searchResults}>
              {searchResults.map(user => (
                <ListGroup.Item
                  key={user.id}
                  onClick={() => handleProfileClick(user.id)}
                  className={navStyles.searchResultItem}
                >
                  {user.username}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;