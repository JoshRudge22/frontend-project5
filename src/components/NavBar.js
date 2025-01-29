import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import prop-types for type checking
import Navbar from 'react-bootstrap/Navbar';
import ConfirmationModal from './ConfirmationModal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/utils';
import navStyles from '../styles/NavBar.module.css';
import btnStyles from '../styles/Buttons.module.css';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const history = useHistory();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    setLoading(true); // Set loading state on sign out
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push('/signin');
    } catch (err) {
      console.error("Error during sign out:", err);
      // Consider displaying an error message to the user
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) return; // Prevent empty searches
    setLoading(true); // Set loading state
    try {
      const response = await axios.get(`/profiles/?search=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching users:", error);
      // Consider displaying an error message to the user
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleProfileClick = (username) => {
    history.push(`/profile/${username}`);
    setSearchResults([]); // Clear search results
  };

  const loggedInIcons = currentUser ? (
    <>
      {/* ... Existing dropdowns ... */}
      <NavDropdown title="Signing Out" id="navbarScrollingDropdown" className={navStyles.Login}>
        <NavDropdown.Item onClick={handleSignOut} disabled={loading}> {/* Disable if loading */}
          <i className="fas fa-sign-out-alt"></i> {loading ? "Signing out..." : "Sign out"}
        </NavDropdown.Item>
        {/* Other items... */}
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
              aria-describedby="search-button" // Accessibility
            />
            <Button id="search-button" className={btnStyles.button} type="submit" disabled={loading}> {/* Disable if loading */}
              {loading ? "Searching..." : "Search"}
            </Button>
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

// Optionally, you can define PropTypes for the component
NavBar.propTypes = {
  // Define any props if necessary
};

export default NavBar;
