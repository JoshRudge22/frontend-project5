import NavBar from './components/NavBar'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import ProfilePage from './pages/profile/ProfilePage';
import CreatePost from './pages/posts/CreatePost';
import FeedPage from './pages/feed/FeedPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <FeedPage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/profiles/:profileId" render={() => <ProfilePage />} />
          <Route exact path="/posts/create" render={() => <CreatePost />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;