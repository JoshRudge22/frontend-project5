import React from 'react'
import { Container, Row, Tab, Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import WelcomeStyles from '../../styles/Welcome.module.css'

function WelcomePage() {
  return (
    <>
      <Container>
        <h1 className={WelcomeStyles.welcome}>Welcome</h1>
      </Container>
      <Container className={WelcomeStyles.container}>
        <Tab.Container className={WelcomeStyles.tab} id="list-group-tabs-example" defaultActiveKey="Welcome">
          <Row>
            <Col sm={4}>
              <ListGroup className={WelcomeStyles.listgroup}>
                <ListGroup.Item className={WelcomeStyles.item} action href="#feed">Feed</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.item} action href="#post">Post</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.item} action href="#profile">Profile</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.item} action href="#interactions">Interactions</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.item} action href="#follow">Follow</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.itemlast} action href="#signingout">Signing Out</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content className={WelcomeStyles.content}>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#feed">
                <h3 className={WelcomeStyles.panetitle}><u>Discover Feed</u></h3>
                <p className={WelcomeStyles.p}>The discover feed is to view every users post that has ever been created.</p>
                <h3 className={WelcomeStyles.panetitle}><u>Following Feed</u></h3>
                <p className={WelcomeStyles.p}>The following feed is just for the other users that you are currently following</p>
                <Link to="/">Click to discover other users!</Link>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#post">
                <h3 className={WelcomeStyles.panetitle}><u>Add Post</u></h3>
                <p className={WelcomeStyles.p}>This is where you will be able to add your own posts of Photos or Videos</p>
                <h3 className={WelcomeStyles.panetitle}><u>Post List</u></h3>
                <p className={WelcomeStyles.p}>In here you will be able to see every post that you have created!</p>
                <Link to="/posts/create">Click to start sharing your photos/videos!</Link>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#profile">
                <h3 className={WelcomeStyles.panetitle}><u>Profile</u></h3>
                <p className={WelcomeStyles.p}>You can check on your profile to see how mnay followers and how many are following you.</p>
                <h3 className={WelcomeStyles.panetitle}><u>Update Profile</u></h3>
                <p className={WelcomeStyles.p}>This is where you can make any changes you need to your profile whether thats your profile picture, bio ect.</p>
                <Link to="/profiles/:profileId">Click to start sharing your photos/videos!</Link>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#interactions">
                <h3 className={WelcomeStyles.panetitle}><u>Comments List</u></h3>
                <p className={WelcomeStyles.p}>This will show every post you have left a comment on!</p>
                <h3 className={WelcomeStyles.panetitle}><u>Likes List</u></h3>
                <p className={WelcomeStyles.p}>This will show every post you have left a like on!</p>
                <Link to="/">Click here to start leaving comments on others posts</Link>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#follow">
                <h3 className={WelcomeStyles.panetitle}><u>Followers</u></h3>
                <p className={WelcomeStyles.p}>Here is where you can see how many followers you have and who they are!</p>
                <h3 className={WelcomeStyles.panetitle}><u>Discover Feed</u></h3>
                <p className={WelcomeStyles.p}>Here is where you can see who you are following.</p>
                <Link to="/">Click here to see all of our users!</Link>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#signingout">
                <h3 className={WelcomeStyles.panetitle}><u>Signing Out</u></h3>
                <p className={WelcomeStyles.p}>Need to log out? Just head over to the signing out option in the navagation bar</p>
                <h3 className={WelcomeStyles.panetitle}><u>Contact Us</u></h3>
                <p className={WelcomeStyles.p}>Fill the form here for any futher issues or questions.</p>
                <Link to="/contact">Click here to contact us!</Link>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  )
}

export default WelcomePage