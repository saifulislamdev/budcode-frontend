import React from 'react';
import './ProjectPage.css';
import {useContext, useEffect, useState, useRef} from 'react';
import { Container, Form, Button, Row, Col, Popover, OverlayTrigger, Overlay, Tooltip,Alert,Modal, Badge, ListGroup, Card, ButtonGroup, ToggleButton} from 'react-bootstrap';
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { join } from 'lodash';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {motion} from 'framer-motion';



const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));


export default function ProjectPage() {

    const [name, setName] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(false);
    const [canUserEdit, setCanUserEdit] = useState(null);
    const [canUserFollow, setCanUserFollow] = useState(null);
    const [canUserRequest, setCanUserRequest] = useState(null);
    const [hasUserRequested, setHasUserRequested] = useState(null);
    const [isUserFollowing, setIsUserFollowing] = useState(null);
    const [isUserAMember, setIsUserAMember] = useState(null);
    const [isValidUser, setIsValidUser] = useState(null);
    const [members, setMembers] = useState(''); // array that is converted to a string
    const [membersWithJoinDates, setMembersWithJoinDates] = useState([]);
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [creatorUserName, setCreatorUserName] = useState('');
    const [creatorEmail, setCreatorEmail] = useState('');
    const [numOfFollowers, setNumOfFollowers] = useState('');
    const [userMutualSkills, setUserMutualSkills] = useState([]);
    const [message, setMessage] = useState("");

    const {id} = useParams();

    let { authorization } = useContext(UserContext);
   
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('authorization'));
    }
    let navigate = useNavigate(); 

    const getProject = async (id) => {
        await axiosInstance
            .get(`/projects/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization}, 
            } 
            )
            .then((response) => {
                setName(response.data.name);
                setTags(response.data.tags.toString());
                setDescription(response.data.description);
                setSkills(response.data.skills.toString());
                setLinks(response.data.links);
                setCanUserEdit(response.data.canUserEdit);
                setCanUserFollow(response.data.canUserFollow);
                setCanUserRequest(response.data.canUserRequest);
                setHasUserRequested(response.data.hasUserRequested);
                setIsUserFollowing(response.data.isUserFollowing);
                setIsUserAMember(response.data.isUserAMember);
                setIsValidUser(response.data.isValidUser);
                setMembersWithJoinDates(response.data.members);
                setCreatedAt(response.data.createdAt);
                setCreatorUserName(response.data.creatorUserName);
                setCreatorEmail(response.data.creatorEmail);
                setNumOfFollowers(response.data.numOfFollowers);
                setUserMutualSkills(response.data.userMutualSkills);
                // take only usernames of project members (no join date) and put it in an array 
                // the array is then converted to a string
                setMembers(
                    response.data.members.map(
                        // project member's username and their join date in an obj
                        (usernameAndJoinDate) => 
                            // take only the project member's username
                            usernameAndJoinDate.username
                        
                    ).toString()
                );
                setStatus(response.data.status);
                console.log(response);
                console.log(response.data.canUserFollow);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };


    useEffect(() => {
        getProject(id);
        console.log(id);
        console.log(authorization);
        console.log(skills);


    }, []);

    const editProject = async (e) => {
        e.preventDefault();
        setError(false);  
        console.log(canUserEdit);
        console.log(authorization);
        console.log('members when splitting', members.split(','));
            const putData = {
                name: name,
                description: description,
                status: status,
                skills: skills.split(','),
                tags: tags.split(','),
                members: members.split(','),
                links: links,
                canReview: status === 'Complete'?true:false

             
            };
            try {
                const response = await axiosInstance.put(`/projects/${id}`, putData, {
                    headers: {'authorization': 'Bearer ' + authorization},
                },
                );       
                alert("Project was updated successfully!");
                console.log(response);          
            }
            catch(err) {
                console.log(canUserEdit);
                console.log(authorization);
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            }      
    };

    const requestJoinProject = async (e) => {
        e.preventDefault();
        setError(false);
            try {
                const response = await axiosInstance.post(`/projects/${id}/requests`, {message}, {
                    headers: {'authorization': 'Bearer ' + authorization},
                },
                );       
                alert("You have successfully requested to join!");
                console.log(response);          
            }
            catch(err) {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            }
            setShow(false);      
    };

    const followProject = async (e) => {
        e.preventDefault();
        setError(false);  
        
        console.log(canUserFollow);
        await axiosInstance
            .post(`/projects/${id}/follow` ,{}, {
                headers: {'authorization': 'Bearer ' + authorization}, 
            }
            )
            .then((response) => {            
                console.log(response);
                alert("You have successfully followed this project!");
                window.location.reload(); 
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                console.log(authorization);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });       
    };

    /*const handleChange = (e, index) => {
        console.log('hello');
        const clonedData = [...members];
        clonedData[index][e.target.name] = e.target.value;
        
        setMembers(clonedData);
    }*/
    
    const classes = useStyles();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const skills2 = skills.split(',');
    const tags2 = tags.split(',');
    const members2 = members.split(',');

    const [isOpen, setIsOpen] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
            Register or login to use this feature!
            </Popover.Body>
        </Popover>
    );

    const radios = [
        {name: 'In Progress', value: 'In Progress'},
        {name: 'Complete', value: 'Complete'}
    ]

    const target = useRef(null);
    console.log('members', members);
    console.log('membersWithJoinDates', membersWithJoinDates);
    return (
        <section id="header">
            <Container>
                {canUserEdit && (
                    <div>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        {name}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {description}
                        </Typography>
                        {canUserFollow && (
                            <Form.Group className='button-form'>
                            <Button variant="outline-info" type="submit" onClick={followProject}>Follow</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={handleShow} disabled>Request</Button>{' '}
                            </Form.Group>
                        )}
                        {!canUserFollow && (
                            <Form.Group className='button-form'>
                            <Button variant="info" type="submit" onClick={followProject} disabled>Following</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={handleShow} disabled>Request</Button>{' '}
                            </Form.Group>
                        )}

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Message</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form>
                                <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                                >
                                <Form.Control as="textarea" rows={3} onChange = {(e) => (setMessage(e.target.value))}/>
                                </Form.Group>
                            </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={requestJoinProject}>
                                Request
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    
                    {numOfFollowers == 0  && (  
                            <div className= "project-details">
                            <Row>
                                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                                Creator: {creatorUserName} | Created: {createdAt.substring(0,10)} | {numOfFollowers} Followers | Status: <Badge pill bg="success">
                                    {status}
                                </Badge>
                                </Typography>
                            </Row>
                            </div>       
                    )}
                    {numOfFollowers == 1 && (  
                            <div className= "project-details">
                            <Row>
                                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                                Creator: {creatorUserName} | Created: {createdAt.substring(0,10)} | {numOfFollowers} Follower | Status: <Badge pill bg="success">
                                    {status}
                                </Badge>
                                </Typography>
                            </Row>
                            </div>       
                    )}
                    {numOfFollowers >= 2 && (  
                            <div className= "project-details">
                            <Row>
                                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                                Creator: {creatorUserName} | Created: {createdAt.substring(0,10)} | {numOfFollowers} Followers | Status: <Badge pill bg="success">
                                    {status}
                                </Badge>
                                </Typography>
                            </Row>
                            </div>       
                    )}

                 
                    {/* <div className="transition-div">
                        <motion.div transition={{layout: {duration: 1}}} 
                        layout
                        onClick={() => setIsOpen(!isOpen)} 
                        className='transition-card'
                        style={{borderRadius: '1rem', boxShadow: '0px 10px 30px rgba(0,0,0, 0.5)'}}>
                            <motion.h2 layout="position">Project Information</motion.h2>
                            {isOpen && (
                            <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            transition={{duration: 1}}
                            className='expand'>
                                <h4 className="display-inline-h4">Creator:</h4> <h5>{creatorUserName}</h5>
                                <h4 className="display-inline-h4">Created:</h4> <h5>{createdAt.substring(0,10)}</h5>
                                <h4 className="display-inline-h4"># of Followers</h4> <h5>{numOfFollowers}</h5>
                                <h4 className="display-inline-h4">Status:</h4> <Badge pill bg="success">
                            {status}
                        </Badge>
                                
                            </motion.div>
                            )}
                        </motion.div>
                    </div> */}

                    <h1 className="text-info">Requirements</h1>
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

                    <h1 className="text-info">Tags</h1>
                    <Row xs={1} md={5} className="g-4">
                    {tags2.map(tag => ( 
                        Array.from({ length: 1 }).map((_, idx) => (
                        <Col>     
                            <ListGroup>
                                <ListGroup.Item>{tag}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        ))  
                    ))}
                    </Row>

                    <h1 className="text-info">Members</h1>
                    <Row xs={1} md={5} className="g-4">
                    {membersWithJoinDates.map(member => ( 
                        Array.from({ length: 1 }).map((_, idx) => (
                        <Col>     
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{member.username}</Card.Title>
                                    <Card.Text>Joined: {member.joinedAt.substring(0,10)}</Card.Text>
                                    <Card.Link className="mb-2 text-muted" href={"/users/" + member.username}>Link to Profile</Card.Link>    
                                </Card.Body>
                            </Card>
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
                    
                    {!(userMutualSkills.length == 0 ) && (
                        <div>
                            <h1 className="text-info">User Mutual Skills</h1>
                            <Row xs={1} md={5} className="g-4">
                            {userMutualSkills.map(userMutualSkill => ( 
                                Array.from({ length: 1 }).map((_, idx) => (
                                <Col>     
                                    <ListGroup>
                                        <ListGroup.Item>{userMutualSkill}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                ))  
                            ))}
                            </Row>
                        </div>
                    )}
                    

                    <div className="contact-footer">
                    <Row >
                    <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                        Questions? Contact here:
                        </Typography>
                        <Typography variant="h7" align="center" color="textSecondary" paragraph>
                        {creatorEmail}
                        </Typography>
                    </Row>
                    </div>

                    <div className='alert-project'>
                    <Row>
                        <Alert variant="info">
                            <Alert.Heading>Hey, nice to see you!</Alert.Heading>
                            <p>
                                Below you can edit the details for your project and above this, you can see how your project will look to others.
                            </p>                 
                        </Alert>
                    </Row>
                    </div>
                    <Row>               
                        <Col>  
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control type="text" defaultValue = {name} onChange = {(e) => (setName(e.target.value))}/>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col> 
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control as="textarea" rows={5} defaultValue = {description} onChange = {(e) => (setDescription(e.target.value))}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Members</Form.Label>
                            <Form.Control as="textarea" rows={2} defaultValue = {members} onChange = {(e) => (setMembers(e.target.value))}/>
                            <Form.Text className="text-muted">
                            Enter project members and separate with commas. Ex: (John, Jill, Joe)
                            </Form.Text>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Requirements</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {skills} onChange = {(e) => (setSkills(e.target.value))}/>
                            <Form.Text className="text-muted">
                            Enter your project requirements and separate with commas. Ex: (c++, javascript, react)
                            </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Text>
                            <ButtonGroup>
                                {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-success' : 'outline-warning'}
                                    name="radio"
                                    value={radio.value}
                                    checked={status === radio.value}
                                    onChange={(e) => setStatus(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                                ))}
                            </ButtonGroup>
                            </Form.Text>

                            {/* <Form.Control type="text" defaultValue = {status} onChange = {(e) => (setStatus(e.target.value))}/> */}
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Tags</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {tags} onChange = {(e) => (setTags(e.target.value))}/>
                            <Form.Text className="text-muted">
                            Enter your tags and separate with commas. Ex: (fontend, design, applications)
                            </Form.Text>
                            </Form.Group>
                            <Form.Label>Links</Form.Label>
                            {links.map((link) => {
                                return (
                                <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                
                                <Form.Control
                                    type='text'
                                    defaultValue={link.type}
                                    onChange={(e) => {link.type = e.target.value; setLinks([...links]);}}
                                    />
                                <Form.Control
                                    type='text'
                                    defaultValue={link.link}
                                    onChange={(e) => {link.link = e.target.value; setLinks([...links]);}}
                                />
                                </Form.Group>
                                </Form>

                                );
                            })
                        }
                            </Form>
                        </Col>
                    </Row>   
                    <Form.Group className="mb-3" controlId="submitform">
                            <Button variant="outline-info" type="submit" onClick={editProject}>
                                Update
                            </Button> 
                    </Form.Group>
                    {error ? (
                                <p style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            ) : null}            
                    </div>
                )}
                


                {!canUserEdit && (
                    <div>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    {name}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    {description}
                    </Typography>
                    {isValidUser && canUserFollow && canUserRequest && !hasUserRequested && (
                            <Form.Group className='button-form'>
                            <Button variant="outline-info" type="submit" onClick={followProject}>Follow</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={handleShow}>Request</Button>{' '}
                            </Form.Group>
                    )}
                    {isValidUser && !canUserFollow && canUserRequest && !hasUserRequested && (
                            <Form.Group className='button-form'>
                            <Button variant="info" type="submit" onClick={followProject} disabled>Following</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={handleShow}>Request</Button>{' '}
                            </Form.Group>
                    )}
                    {isValidUser && canUserFollow && !canUserRequest && hasUserRequested && (
                            <Form.Group className='button-form'>
                            <Button variant="outline-info" type="submit" onClick={followProject}>Follow</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={handleShow} disabled>Request</Button>{' '}
                            </Form.Group>
                    )}
                    {isValidUser && !canUserFollow && !canUserRequest && hasUserRequested && (
                            <Form.Group className='button-form'>
                            <Button variant="info" type="submit" onClick={followProject} disabled>Following</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={handleShow} disabled>Request</Button>{' '}
                            </Form.Group>
                    )}
                    {!isValidUser && (
                            <Form.Group className='button-form'>
                                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                    <Button variant="secondary">Follow</Button>
                                </OverlayTrigger>{' '}
                                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                    <Button variant="secondary">Request</Button>
                                </OverlayTrigger>{' '}                    
                            </Form.Group>
                    )} 

                     <Modal show={show} onHide={handleClose}>
                         <Modal.Header closeButton>
                         <Modal.Title>Message</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                         <Form>
                             <Form.Group
                             className="mb-3"
                             controlId="exampleForm.ControlTextarea1"
                             >
                             <Form.Control as="textarea" rows={3} onChange = {(e) => (setMessage(e.target.value))}/>
                             </Form.Group>
                         </Form>
                         </Modal.Body>
                         <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
                             Close
                         </Button>
                         <Button variant="primary" onClick={requestJoinProject}>
                             Submit
                         </Button>
                         </Modal.Footer>
                     </Modal>

                     {numOfFollowers == 0  && (  
                            <div className= "project-details">
                            <Row>
                                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                                Creator: {creatorUserName} | Created: {createdAt.substring(0,10)} | {numOfFollowers} Followers | Status: <Badge pill bg="success">
                                    {status}
                                </Badge>
                                </Typography>
                            </Row>
                            </div>       
                    )}
                    {numOfFollowers == 1 && (  
                            <div className= "project-details">
                            <Row>
                                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                                Creator: {creatorUserName} | Created: {createdAt.substring(0,10)} | {numOfFollowers} Follower | Status: <Badge pill bg="success">
                                    {status}
                                </Badge>
                                </Typography>
                            </Row>
                            </div>       
                    )}
                    {numOfFollowers >= 2 && (  
                            <div className= "project-details">
                            <Row>
                                <Typography variant="h7" align="center" color="textSecondary" paragraph>
                                Creator: {creatorUserName} | Created: {createdAt.substring(0,10)} | {numOfFollowers} Followers | Status: <Badge pill bg="success">
                                    {status}
                                </Badge>
                                </Typography>
                            </Row>
                            </div>       
                    )}
                    

                    {/* <div className="transition-div">
                        <motion.div transition={{layout: {duration: 1}}} 
                        layout
                        onClick={() => setIsOpen(!isOpen)} 
                        className='transition-card'
                        style={{borderRadius: '1rem', boxShadow: '0px 10px 30px rgba(0,0,0, 0.5)'}}>
                            <motion.h2 layout="position">Project Information</motion.h2>
                            {isOpen && (
                            <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            transition={{duration: 1}}
                            className='expand'>
                                <h4 className="display-inline-h4">Creator:</h4> <h5>{creatorUserName}</h5>
                                <h4 className="display-inline-h4">Created:</h4> <h5>{createdAt.substring(0,10)}</h5>
                                <h4 className="display-inline-h4"># of Followers</h4> <h5>{numOfFollowers}</h5>
                                <h4 className="display-inline-h4">Status:</h4> <Badge pill bg="success">
                            {status}
                        </Badge>
                                
                            </motion.div>
                            )}
                        </motion.div>
                    </div> */}

                    <h1 className="text-info">Requirements</h1>
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

                    <h1 className="text-info">Tags</h1>
                    <Row xs={1} md={5} className="g-4">
                    {tags2.map(tag => ( 
                        Array.from({ length: 1 }).map((_, idx) => (
                        <Col>     
                            <ListGroup>
                                <ListGroup.Item>{tag}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        ))  
                    ))}
                    </Row>

                    <h1 className="text-info">Members</h1>
                    <Row xs={1} md={5} className="g-4">
                    {membersWithJoinDates.map(member => ( 
                        Array.from({ length: 1 }).map((_, idx) => (
                        <Col>     
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{member.username}</Card.Title>
                                    <Card.Text>Joined: {member.joinedAt.substring(0,10)}</Card.Text>
                                    <Card.Link className="mb-2 text-muted" href={"/users/" + member.username}>Link to Profile</Card.Link>    
                                </Card.Body>
                            </Card>
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

                    <h1 className="text-info">User Mutual Skills</h1>
                    <Row xs={1} md={5} className="g-4">
                    {userMutualSkills.map(userMutualSkill => ( 
                        Array.from({ length: 1 }).map((_, idx) => (
                        <Col>     
                            <ListGroup>
                                <ListGroup.Item>{userMutualSkill}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        ))  
                    ))}
                    </Row>
                    
                    <div className="contact-footer">
                    <Row >
                    <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                        Questions? Contact here:
                        </Typography>
                        <Typography variant="h7" align="center" color="textSecondary" paragraph>
                        {creatorEmail}
                        </Typography>
                    </Row>
                    </div>

                    {error ? (
                                <p style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            ) : null}                   
                    </div>
                )}                       
            </Container>      
        </section>         
    );
}

