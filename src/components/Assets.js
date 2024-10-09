import React from "react";
import PropTypes from "prop-types"; // Import prop-types
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Assets.module.css";

const Asset = ({ spinner, src, message, altMessage }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && (
        <Spinner 
          animation="border" 
          role="status" 
          aria-hidden={!spinner} // Accessibility
        >
          <span className="visually-hidden">Loading...</span> {/* Screen reader text */}
        </Spinner>
      )}
      {src && <img src={src} alt={altMessage || message} className={styles.Image} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

// Define prop types for better maintainability
Asset.propTypes = {
  spinner: PropTypes.bool,
  src: PropTypes.string,
  message: PropTypes.string,
  altMessage: PropTypes.string // Optional alt text for images
};

// Set default props
Asset.defaultProps = {
  spinner: false,
  src: '',
  message: '',
  altMessage: 'Image'
};

export default Asset;
