import React from 'react'
import NoResults from '../media/no-results.png'
import notFoundStyles from '../styles/Noresults.module.css'
import Asset from "./Assets";

const NotFound = () => {
    return (
      <div className={notFoundStyles.notFound}>
        <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
      </div>
    );
  };

export default NotFound