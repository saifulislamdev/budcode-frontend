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
  const [visitingUserMutualProjects, setVisitingUserMutualProjects] = useState(
    []
  );
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
        {!canEdit && (
          <div>
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
                      {firstName} {lastName} is a(n): {occupation}
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
            <Row>
              <Col xs lg='2'>
                <h1 className='text-info'>Skills</h1>
                {skills2.map((skill) => {
                  return (
                    <ListGroup>
                      <ListGroup.Item>{skill}</ListGroup.Item>
                    </ListGroup>
                  );
                })}

                <h1 className='text-info'>Interests</h1>
                {interests2.map((interest) => {
                  return (
                    <ListGroup>
                      <ListGroup.Item>{interest}</ListGroup.Item>
                    </ListGroup>
                  );
                })}
              </Col>
              <Col md='auto'>
                <h1 className='text-info'>Links</h1>
                {links.map((link) => {
                  return (
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{link.type}</Card.Title>
                        <Card.Link className='mb-2 text-muted' href={link.link}>
                          {link.link}
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Col>
              <Col md='auto'>
                <h1 className='text-info'>Project Following</h1>
                <div className='project-following-scroll'>
                  {projectFollowings.map((projectFollowing) => {
                    return (
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            {projectFollowing.projectName}
                          </Card.Title>
                          <Card.Text>
                            The project id is: {projectFollowing.projectId}
                          </Card.Text>
                          <Card.Link
                            href={'/projects/' + projectFollowing.projectId}
                          >
                            Link to project
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </Col>
              <Col xs lg='4'>
                <h1 className='text-info'>Project Membership</h1>
                <div className='project-membership-scroll'>
                  {projectMemberships.map((projectMembership) => {
                    return (
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>
                            {projectMembership.projectName}
                          </Card.Title>
                          <Card.Subtitle className='mb-2 text-muted'>
                            {projectMembership.projectStatus}
                          </Card.Subtitle>
                          <Card.Text>
                            The project id is: {projectMembership.projectId}
                          </Card.Text>
                          <Card.Link
                            href={'/projects/' + projectMembership.projectId}
                          >
                            Link to project
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        )}
        {canEdit && (
          <div>
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
                      {firstName} {lastName} is a(n): {occupation}
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
            <Row>
              <Col xs lg='2'>
                <h1 className='text-info'>Skills</h1>
                <div className='skills-scroll'>
                  {skills2.map((skill) => {
                    return (
                      <ListGroup>
                        <ListGroup.Item>{skill}</ListGroup.Item>
                      </ListGroup>
                    );
                  })}
                </div>
                <h1 className='text-info'>Interests</h1>
                <div className='interest-scroll'>
                  {interests2.map((interest) => {
                    return (
                      <ListGroup>
                        <ListGroup.Item>{interest}</ListGroup.Item>
                      </ListGroup>
                    );
                  })}
                </div>
              </Col>
              <Col md='auto'>
                <h1 className='text-info'>Links</h1>
                {links.map((link) => {
                  return (
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{link.type}</Card.Title>
                        <Card.Link className='mb-2 text-muted' href={link.link}>
                          {link.link}
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Col>
              <Col md='auto'>
                <h1 className='text-info'>Project Following</h1>
                <div className='project-following-scroll'>
                  {projectFollowings.map((projectFollowing) => {
                    return (
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            {projectFollowing.projectName}
                          </Card.Title>
                          <Card.Text>
                            The project id is: {projectFollowing.projectId}
                          </Card.Text>
                          <Card.Link
                            href={'/projects/' + projectFollowing.projectId}
                          >
                            Link to project
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </Col>
              <Col xs lg='4'>
                <h1 className='text-info'>Project Membership</h1>
                <div className='project-membership-scroll'>
                  {projectMemberships.map((projectMembership) => {
                    return (
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>
                            {projectMembership.projectName}
                          </Card.Title>
                          <Card.Subtitle className='mb-2 text-muted'>
                            {projectMembership.projectStatus}
                          </Card.Subtitle>
                          <Card.Text>
                            The project id is: {projectMembership.projectId}
                          </Card.Text>
                          <Card.Link
                            href={'/projects/' + projectMembership.projectId}
                          >
                            Link to project
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Alert variant='info'>
                <Alert.Heading>Hey, nice to see you!</Alert.Heading>
                <p>
                  Below you can edit the details for your profile and above
                  this, you can see how your profile will look to others.
                </p>
              </Alert>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
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
                      rows={3}
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
                      placeholder='Enter your skills and separate with commas. Ex: (c++, javascript, react)'
                      defaultValue={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
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
                      placeholder='Enter your interests and separate with commas. Ex: (fontend, design, applications)'
                      defaultValue={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
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
      </Container>
      <Rating
        firstName={firstName}
        userId={id}
        reviews={reviews}
        canReview={canReview}
      />
    </section>
  );
}
