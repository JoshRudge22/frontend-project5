import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, ListGroup } from "react-bootstrap";
import navStyles from '../styles/NavBar.module.css';
import btnStyles from '../styles/Buttons.module.css';
import { NavLink, useHistory  } from 'react-router-dom';
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
      const response = await axios.get(`/profiles/?search=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleProfileClick = (username) => {
    history.push(`/profile/${username}`);
  };

  const loggedInIcons = currentUser ? (
    <>
      <NavDropdown title="Feed" id="navbarScrollingDropdown" className={navStyles.NavLink}>
        <NavDropdown.Item onClick={() => history.push("/")}>
          <i className="fa-solid fa-eye"></i> Discover Feed
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/feed")}>
          <i className="fa-solid fa-images"></i> Following Feed
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Posts" id="navbarScrollingDropdown" className={navStyles.NavLink}>
        <NavDropdown.Item onClick={() => history.push("/posts/create")}>
          <i className="fa-solid fa-plus"></i> Add Post
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/posts/list")}>
          <i className="fa-solid fa-list"></i> Post List
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Profile" id="navbarScrollingDropdown" className={navStyles.NavLink}>
        <NavDropdown.Item onClick={() =>  history.push(`/profiles/${currentUser.profile_id}`)}>
        <i className="fa-solid fa-user"></i> Profile
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push(`/edit/${currentUser.profile_id}`)}>
        <i className="fa-solid fa-user-pen"></i> Update Profile
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Interactions" id="navbarScrollingDropdown" className={navStyles.NavLink}>
        <NavDropdown.Item onClick={() => history.push("/commentslist")}>
          <i className="fa-solid fa-comments"></i> Comments
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/feed")}>
          <i className="fa-solid fa-thumbs-up"></i>Likes
        </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Follow" id="navbarScrollingDropdown" className={navStyles.NavLink}>
        <NavDropdown.Item onClick={() => history.push("/followerslist")}>
        <i className="fa-solid fa-user-group"></i> Followers
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/followinglist")}>
        <i className="fa-solid fa-people-robbery"></i> Following
        </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Signing Out" id="navbarScrollingDropdown" className={navStyles.NavLink}>
        <NavDropdown.Item onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i> Sign out
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/contact")}>
        <i className="fa-solid fa-file-contract"></i> Contact Us
        </NavDropdown.Item>
        </NavDropdown>
    </>
  ) : null;

  const loggedOutIcons = !currentUser && (
    <>
      <NavLink className={navStyles.NavLink} to="/">
        <i className="fas fa-stream"></i> Feed
      </NavLink>
      <NavLink className={navStyles.NavLink} to="/signin">
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink to="/signup" className={navStyles.NavLink}>
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
      <NavLink to="/contact" className={navStyles.NavLink}>
        <i className="fa-solid fa-file-contract"></i> Contact Us
      </NavLink>
    </>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {loggedInIcons}
            {loggedOutIcons}
          </Nav>
          <Form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
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
                key={user.profile_id}
                onClick={() => handleProfileClick(user.user)}
              >
                {user.user}
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