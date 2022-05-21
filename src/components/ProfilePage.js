import React, { useContext, useEffect, useState, useCallback } from 'react';
import './ProfilePage.css';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Alert,
} from 'react-bootstrap';
import { UserContext } from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from './Rating';
import Carousel from 'react-bootstrap/Carousel';
import gradientPic from '../assets/gradientPic.jpg';

export default function ProfilePage() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const username = JSON.parse(window.localStorage.getItem('username'));
  let { authorization } = useContext(UserContext);
  if (!authorization) {
    authorization = JSON.parse(window.localStorage.getItem('authorization'));
  }
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');
  const [links, setLinks] = useState([]);
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [canEdit, setCanEdit] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [projectFollowings, setProjectFollowings] = useState([]);
  const [projectMemberships, setProjectMemberships] = useState([]);
  const [visitingUserMutualProjects, setVisitingUserMutualProjects] = useState([]);
  const [canReview, setCanReview] = useState(false);

  console.log('projectFollowings', projectFollowings);

  const getUser = useCallback(async (id) => {
    await axiosInstance
      .get(`/users/${id}`, {
        headers: { authorization: 'Bearer ' + authorization },
      })
      .then((response) => {
        const {
          bio,
          canEdit,
          canReview,
          email,
          firstName,
          interests,
          lastName,
          links,
          occupation,
          projectFollowings,
          projectMemberships,
          reviews,
          skills,
          visitingUserMutualProjects,
        } = response.data;
        setBio(bio);
        setCanEdit(canEdit);
        setCanReview(canReview);
        setEmail(email);
        setFirstName(firstName);
        setInterests(interests.toString());
        setLastName(lastName);
        setLinks(links);
        setOccupation(occupation);
        setProjectFollowings(projectFollowings);
        setProjectMemberships(projectMemberships);
        setReviews(reviews);
        setSkills(skills.toString());
        setVisitingUserMutualProjects(visitingUserMutualProjects || []);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        setErrorMessage(err.response.data.msg);
        setError(true);
      });
  }, []);

  useEffect(() => {
    getUser(id);
  }, []);

  const editProfile = async (e) => {
    e.preventDefault();
    setError(false);
    console.log(canEdit);
    if (canEdit) {
      const putData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        bio: bio,
        occupation: occupation,
        links: links,
        interests: interests.split(','),
        skills: skills.split(','),
      };
      try {
        const response = await axiosInstance.put(`/users/${id}`, putData, {
          headers: { authorization: 'Bearer ' + authorization },
        });

        alert('Profile was edited successfully!');
        console.log(response);
        console.log(id);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        setErrorMessage(err.response.data.msg);
        setError(true);
      }
    }
  };

  const skills2 = skills.split(',');
  const interests2 = interests.split(',');

  return (
    <section id='header'>
      <Container>
        
            <Row>
              <Carousel fade>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={gradientPic}
                    style={{ height: '200px', width: '100px' }}
                    alt='First slide'
                  />
                  <Carousel.Caption>
                    <h1>
                      Welcome to {firstName} {lastName}'s Profile!
                    </h1>
                    <p>
                      Occupation: {occupation}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={gradientPic}
                    style={{ height: '200px', width: '100px' }}
                    alt='Second slide'
                  />
                  <Carousel.Caption>
                    <h1>About Me</h1>
                    <p>{bio}</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={gradientPic}
                    style={{ height: '200px', width: '100px' }}
                    alt='Third slide'
                  />
                  <Carousel.Caption>
                    <h1>Contact Me</h1>
                    <p>{email}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Row>

            <h1 className='text-info'>Skills</h1>
            <Row xs={1} md={5} className="g-4">
              {skills2.map(skill => ( 
                Array.from({ length: 1 }).map((_, idx) => (
                  <Col>     
                       <ListGroup>
                        <ListGroup.Item>{skill}</ListGroup.Item>
                      </ListGroup>
                  </Col>
                  ))  
              ))}
            </Row>

            <h1 className='text-info'>Interests</h1>
            <Row xs={1} md={5} className="g-4">
              {interests2.map(interest => ( 
                Array.from({ length: 1 }).map((_, idx) => (
                  <Col>     
                       <ListGroup>
                        <ListGroup.Item>{interest}</ListGroup.Item>
                      </ListGroup>
                  </Col>
                  ))  
              ))}
            </Row>

            <h1 className='text-info'>Links</h1>
            <Row xs={1} md={5} className="g-4">
              {links.map(link => ( 
                Array.from({ length: 1 }).map((_, idx) => (
                  <Col>     
                       <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{link.type}</Card.Title>
                        <Card.Link className='mb-2 text-muted' href={link.link}>
                          {link.link}
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  ))  
              ))}
            </Row>


            <h1 className='text-info'>Project Following</h1>
            <Row xs={1} md={5} className="g-4">
              {projectFollowings.map(projectFollowing => ( 
                Array.from({ length: 1 }).map((_, idx) => (
                  <Col>     
                        <div>
                        <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>
                            {projectFollowing.projectName}
                          </Card.Title>
                          <Card.Link
                            href={'/projects/' + projectFollowing.projectId}
                          >
                            Link to project
                          </Card.Link>
                        </Card.Body>
                        </Card>
                        </div>
                  </Col>
                  ))  
              ))}
            </Row>

            <h1 className='text-info'>Project Membership</h1>
            <Row xs={1} md={5} className="g-4">
              {projectMemberships.map(projectMembership => ( 
                Array.from({ length: 1 }).map((_, idx) => (
                  <Col>     
                        <div>
                        <Card style={{ width: '18rem' }}>
                          <Card.Body>
                            <Card.Title>
                              {projectMembership.projectName}
                            </Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>
                              {projectMembership.projectStatus}
                            </Card.Subtitle>
                            <Card.Link
                              href={'/projects/' + projectMembership.projectId}
                            >
                              Link to project
                            </Card.Link>
                          </Card.Body>
                        </Card>
                        </div>
                  </Col>
                  ))  
              ))}
            </Row>

            {canEdit && (
            <div className = "alert-profile">
            <Row >
              <Alert variant='info'>
                <Alert.Heading>Hey, nice to see you, {firstName}!</Alert.Heading>
                <p>
                  You can edit the details of your profile below.
                </p>
              </Alert>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col>
                <Form>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlTextarea1'
                  >
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={5}
                      placeholder='Tell me about yourself.'
                      defaultValue={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    
                  </Form.Group>
                </Form>
              </Col>

              <Col>
                <Form>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlTextarea1'
                  >
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      defaultValue={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Enter your skills and separate with commas. Ex: (c++, javascript, react)
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col>
                <Form>
                  <Form.Group
                    className='mb-3'
                    controlId='exampleForm.ControlTextarea1'
                  >
                    <Form.Label>Interest </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      defaultValue={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    Enter your interests and separate with commas. Ex: (fontend, design, applications)
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Col>

              <Col>
                <Form.Label>Links</Form.Label>
                {links.map((link) => {
                  return (
                    <Form>
                      <Form.Group
                        className='mb-3'
                        controlId='exampleForm.ControlTextarea1'
                      >
                        <Form.Control
                          type='text'
                          defaultValue={link.type}
                          onChange={(e) => setLinks(e.target.value)}
                        />
                        <Form.Control
                          type='text'
                          defaultValue={link.link}
                          onChange={(e) => setLinks(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  );
                })}
              </Col>
            </Row>
            <Form.Group className='mb-3' controlId='submitform'>
              <Button
                variant='outline-info'
                type='submit'
                onClick={editProfile}
              >
                Update
              </Button>
            </Form.Group>
          </div>
        )}

      {id !== username &&<Rating
        firstName={firstName}
        userId={id}
        reviews={reviews}
        canReview={canReview}
      />}
        <div className = "review-body-style">
          <h1 className="text-info">Previous Reviews</h1>
        
        {reviews.map((review) => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>{review.subject}</Card.Title>
                <Card.Text>{review.body}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
          
        </div>        

      </Container>
      
    
    </section>
  );
}
