import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import './App.css';

// Lazy loaded components
const SignInForm = lazy(() => import('./pages/auth/SignInForm'));
const SignUpForm = lazy(() => import('./pages/auth/SignUpForm'));
const ProfilePage = lazy(() => import('./pages/profile/info/ProfilePage'));
const EditProfile = lazy(() => import('./pages/profile/update/EditProfile'));
const DeleteProfile = lazy(() => import('./pages/profile/other/DeleteProfile'));
const UsersPage = lazy(() => import('./pages/profile/other/UsersPage'));
const CreatePost = lazy(() => import('./pages/posts/CreatePost'));
const PostList = lazy(() => import('./pages/posts/PostList'));
const OtherUsersPostList = lazy(() => import('./pages/profile/other/OtherUsersPostList'));
const FeedPage = lazy(() => import('./pages/feed/FeedPage'));
const FollowingFeedPage = lazy(() => import('./pages/feed/FollowingFeedPage'));
const CommentsList = lazy(() => import('./pages/interactions/CommentsList'));
const LikeList = lazy(() => import('./pages/interactions/LikesList'));
const LikedPost = lazy(() => import('./pages/interactions/LikedPost')); // Fixed missing import
const MyFollowersList = lazy(() => import('./pages/follow/MyFollowersList'));
const MyFollowingList = lazy(() => import('./pages/follow/MyFollowingList'));
const ContactForm = lazy(() => import('./pages/contact/ContactForm'));
const FormSubmitted = lazy(() => import('./pages/contact/FormSubmitted'));

const isAuthenticated = false;

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Switch>
            {/* Public Routes */}
            <Route exact path="/" component={FeedPage} />
            <Route exact path="/feed" component={FollowingFeedPage} />
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/profiles/:profileId" component={ProfilePage} />
            <Route exact path="/profile/:username" component={UsersPage} />
            <Route exact path="/user/:username/posts" component={OtherUsersPostList} />
            <Route exact path="/posts/list" component={PostList} />
            <Route exact path="/commentslist" component={CommentsList} />
            <Route exact path="/posts/:postId/likes" component={LikeList} />
            <Route exact path="/users/liked-posts" component={LikedPost} />
            <Route exact path="/followerslist" component={MyFollowersList} />
            <Route exact path="/followinglist" component={MyFollowingList} />
            <Route exact path="/contact" component={ContactForm} />
            <Route exact path="/submitted" component={FormSubmitted} />

            {/* Protected Routes */}
            <Route 
              exact 
              path="/edit/:profileId" 
              render={(props) => 
                isAuthenticated ? <EditProfile {...props} /> : <Redirect to="/signin" />
              } 
            />
            <Route 
              exact 
              path="/profiles/delete/:profileId" 
              render={(props) => 
                isAuthenticated ? <DeleteProfile {...props} /> : <Redirect to="/signin" />
              } 
            />
            <Route 
              exact 
              path="/posts/create" 
              render={(props) => 
                isAuthenticated ? <CreatePost {...props} /> : <Redirect to="/signin" />
              } 
            />

            {/* 404 Route */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;