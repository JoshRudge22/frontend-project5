import React from 'react'
import { Container, Row, Tab, Col, ListGroup } from 'react-bootstrap'

function WelcomePage() {
  return (
    <>
      <Container>
        <h1>Welcome</h1>
      </Container>
      <Container>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="Welcome">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href="#feed">Feed</ListGroup.Item>
                <ListGroup.Item action href="#post">Post</ListGroup.Item>
                <ListGroup.Item action href="#profile">Profile</ListGroup.Item>
                <ListGroup.Item action href="#interactions">Interactions</ListGroup.Item>
                <ListGroup.Item action href="#follow">Follow</ListGroup.Item>
                <ListGroup.Item action href="#signingout">Signing Out</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#feed">
                <h3><u>Discover Feed</u></h3>
                <p>The discover feed is to view every users post that has ever been created.</p>
                <h3><u>Following Feed</u></h3>
                <p>The following feed is just for the other users that you are currently following</p>
                </Tab.Pane>
                <Tab.Pane eventKey="#post">
                <h3><u>Add Post</u></h3>
                <p>This is where you will be able to add your own posts of Photos or Videos</p>
                <h3><u>Post List</u></h3>
                <p>In here you will be able to see every post that you have created!</p>
                </Tab.Pane>
                <Tab.Pane eventKey="#profile">
                <h3><u>Profile</u></h3>
                <p>You can check on your profile to see how mnay followers and how many are following you.</p>
                <h3><u>Update Profile</u></h3>
                <p>This is where you can make any changes you need to your profile whether thats your profile picture, bio ect.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="#interactions">
                <h3><u>Comments List</u></h3>
                <p>This will show every post you have left a comment on!</p>
                <h3><u>Likes List</u></h3>
                <p>This will show every post you have left a like on!</p>
                </Tab.Pane>
                <Tab.Pane eventKey="#follow">
                <h3><u>Followers</u></h3>
                <p>Here is where you can see how many followers you have and who they are!</p>
                <h3><u>Discover Feed</u></h3>
                <p>Here is where you can see who you are following.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="#signingout">
                <h3><u>Signing Out</u></h3>
                <p>Need to log out? Just head over to the signing out option in the navagation bar</p>
                <h3><u>Contact Us</u></h3>
                <p>Fill the form here for any futher issues or questions.</p>
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