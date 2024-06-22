import React from 'react'
import { Container, Row, Tab, Col, ListGroup } from 'react-bootstrap'
import WelcomeStyles from '../../styles/Welcome.module.css'

function WelcomePage() {
  return (
    <>
      <Container className={WelcomeStyles.welcome}>
        <h1 className={WelcomeStyles.welcomeTitle}>Welcome</h1>
      </Container>
      <Container className={WelcomeStyles.welcomeTitle}>
        <Tab.Container className={WelcomeStyles.tab} id="list-group-tabs-example" defaultActiveKey="Welcome">
          <Row>
            <Col sm={4}>
              <ListGroup className={WelcomeStyles.listGroup}>
                <ListGroup.Item className={WelcomeStyles.listItem} action href="#feed">Feed</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.listItem} action href="#post">Post</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.listItem} action href="#profile">Profile</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.listItem} action href="#interactions">Interactions</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.listItem} action href="#follow">Follow</ListGroup.Item>
                <ListGroup.Item className={WelcomeStyles.listItemLast} action href="#signingout">Signing Out</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content className={WelcomeStyles.content}>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#feed">
                <h3 className={WelcomeStyles.paneTitle}><u>Discover Feed</u></h3>
                <p className={WelcomeStyles.paneText}>The discover feed is to view every users post that has ever been created.</p>
                <h3 className={WelcomeStyles.paneTitle}><u>Following Feed</u></h3>
                <p className={WelcomeStyles.paneText}>The following feed is just for the other users that you are currently following</p>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#post">
                <h3 className={WelcomeStyles.paneTitle}><u>Add Post</u></h3>
                <p className={WelcomeStyles.paneText}>This is where you will be able to add your own posts of Photos or Videos</p>
                <h3 className={WelcomeStyles.paneTitle}><u>Post List</u></h3>
                <p className={WelcomeStyles.paneText}>In here you will be able to see every post that you have created!</p>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#profile">
                <h3 className={WelcomeStyles.paneTitle}><u>Profile</u></h3>
                <p className={WelcomeStyles.paneText}>You can check on your profile to see how mnay followers and how many are following you.</p>
                <h3 className={WelcomeStyles.paneTitle}><u>Update Profile</u></h3>
                <p className={WelcomeStyles.paneText}>This is where you can make any changes you need to your profile whether thats your profile picture, bio ect.</p>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#interactions">
                <h3 className={WelcomeStyles.paneTitle}><u>Comments List</u></h3>
                <p className={WelcomeStyles.paneText}>This will show every post you have left a comment on!</p>
                <h3 className={WelcomeStyles.paneTitle}><u>Likes List</u></h3>
                <p className={WelcomeStyles.paneText}>This will show every post you have left a like on!</p>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#follow">
                <h3 className={WelcomeStyles.paneTitle}><u>Followers</u></h3>
                <p className={WelcomeStyles.paneText}>Here is where you can see how many followers you have and who they are!</p>
                <h3 className={WelcomeStyles.paneTitle}><u>Discover Feed</u></h3>
                <p className={WelcomeStyles.paneText}>Here is where you can see who you are following.</p>
                </Tab.Pane>
                <Tab.Pane className={WelcomeStyles.pane} eventKey="#signingout">
                <h3 className={WelcomeStyles.paneTitle}><u>Signing Out</u></h3>
                <p className={WelcomeStyles.paneText}>Need to log out? Just head over to the signing out option in the navagation bar</p>
                <h3 className={WelcomeStyles.paneTitle}><u>Contact Us</u></h3>
                <p className={WelcomeStyles.paneText}>Fill the form here for any futher issues or questions.</p>
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