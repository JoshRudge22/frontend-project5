import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to indicate an error occurred
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    console.error("Error occurred:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // Fallback UI
    }

    return this.props.children; // Render children if no error
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CurrentUserProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </CurrentUserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// Performance Measurement
reportWebVitals();
