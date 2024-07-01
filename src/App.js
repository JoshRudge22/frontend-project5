import NavBar from './components/NavBar'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import WelcomePage from './pages/auth/WelcomePage';
import ProfilePage from './pages/profile/info/ProfilePage';
import EditProfile from './pages/profile/update/EditProfile';
import DeleteProfile from './pages/profile/other/DeleteProfile';
import UsersPage from './pages/profile/other/UsersPage';
import CreatePost from './pages/posts/CreatePost';
import PostList from './pages/posts/PostList'
import FeedPage from './pages/feed/FeedPage';
import CommentsList from './pages/interactions/CommentsList'
import LikeList from './pages/interactions/LikesList';
import LikedPost from './pages/interactions/LikedPost';
import FollowingFeedPage from './pages/feed/FollowingFeedPage'
import MyFollowersList from './pages/follow/MyFollowersList'
import MyFollowingList from './pages/follow/MyFollowingList'
import ContactForm from './pages/contact/ContactForm'
import FormSubmitted from './pages/contact/FormSubmmited';





function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <FeedPage />} />
          <Route exact path="/feed" render={() => <FollowingFeedPage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/welcomePage" render={() => <WelcomePage />} />
          <Route exact path="/profiles/:profileId" render={() => <ProfilePage />} />
          <Route exact path="/edit/:profileId" render={() => <EditProfile />} />
          <Route exact path="/profile/:username" render={(props) => <UsersPage {...props} />} />
          <Route exact path="/profiles/delete/:profileId" render={() => <DeleteProfile />} />
          <Route exact path="/posts/create" render={() => <CreatePost />} />
          <Route exact path="/posts/list" render={() => <PostList />} />
          <Route exact path="/commentslist" render={() => <CommentsList />} />
          <Route exact path="/posts/:postId/likes" render={({ match }) => <LikeList postId={match.params.postId} />} />
          <Route exact path="/users/liked-posts" render={({ match }) => <LikedPost postId={match.params.postId} />} />
          <Route exact path="/followerslist" render={() => <MyFollowersList />} />
          <Route exact path="/followinglist" render={() => <MyFollowingList />} />
          <Route exact path="/contact" render={() => <ContactForm />} />
          <Route exact path="/submitted" render={() => <FormSubmitted />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;