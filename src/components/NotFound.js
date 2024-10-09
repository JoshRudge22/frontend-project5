import React from 'react';
import NoResults from '../media/no-results.png';
import notFoundStyles from '../styles/Noresults.module.css';
import Asset from "./Assets";
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={notFoundStyles.notFound}>
      <Asset 
        src={NoResults} 
        message="Sorry, the page you're looking for doesn't exist" 
        altMessage="No results found" // Added alt message
      />
      <div className={notFoundStyles.navigation}>
        <NavLink to="/" className={notFoundStyles.link}>
          Go back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
