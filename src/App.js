import NavBar from './components/NavBar'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/profile/:profileId" render={() => <ProfilePage />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;