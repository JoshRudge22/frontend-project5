import NavBar from './components/NavBar'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import ProfilePage from './pages/profile/ProfilePage';
import UsersPage from './pages/profile/UsersPage';
import CreatePost from './pages/posts/CreatePost';
import PostList from './pages/posts/PostList'
import FeedPage from './pages/feed/FeedPage';
import ContactForm from './pages/contact/ContactForm'


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
          <Route exact path="/profile/:username" render={(props) => <UsersPage {...props} />} />
          <Route exact path="/posts/create" render={() => <CreatePost />} />
          <Route exact path="/posts/list" render={() => <PostList />} />
          <Route exact path="/contact" render={() => <ContactForm />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;