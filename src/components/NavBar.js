import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';
import navStyles from '../styles/NavBar.module.css';
import btnStyles from '../styles/Buttons.module.css';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push('/signin');
    } catch (err) {
      console.log("Error during sign out:", err);
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
    setSearchResults([]);
  };

  const loggedInIcons = currentUser ? (
    <>
      <NavDropdown title="Feed" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={() => history.push("/")}>
          <i className="fa-solid fa-eye"></i> Discover Feed
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/feed")}>
          <i className="fa-solid fa-images"></i> Following Feed
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Posts" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={() => history.push("/posts/create")}>
          <i className="fa-solid fa-plus"></i> Add Post
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/posts/list")}>
          <i className="fa-solid fa-list"></i> Post List
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Profile" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={() => history.push(`/profiles/${currentUser.profile_id}`)}>
          <i className="fa-solid fa-user"></i> Profile
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push(`/edit/${currentUser.profile_id}`)}>
          <i className="fa-solid fa-user-pen"></i> Update Profile
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Interactions" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={() => history.push("/commentslist")}>
          <i className="fa-solid fa-comments"></i> Comments
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/users/liked-posts")}>
          <i className="fa-solid fa-thumbs-up"></i> Likes
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Follow" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={() => history.push("/followerslist")}>
          <i className="fa-solid fa-user-group"></i> Followers
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/followinglist")}>
          <i className="fa-solid fa-people-robbery"></i> Following
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Signing Out" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i> Sign out
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/contact")}>
          <i className="fa-solid fa-file-contract"></i> Contact Us
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push(`/profiles/delete/${currentUser.profile_id}`)}>
          <i className="fa-solid fa-trash"></i> Delete Profile
        </NavDropdown.Item>
      </NavDropdown>
    </>
  ) : null;

  const loggedOutIcons = !currentUser && (
    <>
      <NavLink className={navStyles.Logout} to="/">
        <i className="fas fa-stream"></i> Feed
      </NavLink>
      <NavLink className={navStyles.Logout} to="/signin">
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink to="/signup" className={navStyles.Logout}>
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
      <NavLink to="/contact" className={navStyles.Logout}>
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
          <Form className="d-flex align-items-center" onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <Form.Control
              type="search"
              placeholder="Search Here"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <Button className={btnStyles.button} type="submit">Search</Button>
            {searchResults.length > 0 && (
              <ListGroup className={navStyles.searchResults}>
                {searchResults.map(user => (
                  <ListGroup.Item
                    key={user.profile_id}
                    onClick={() => handleProfileClick(user.user)}
                    action
                  >
                    {user.user} - {user.full_name} - {user.location}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;