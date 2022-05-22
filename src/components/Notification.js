import React, {useContext, useEffect, useState} from 'react';
import './Notification.css';
import { Container, Form, Button, Row, Col, Card, DropdownButton, Dropdown} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../util/config';
import { boolean } from 'yup';
import Spinner from 'react-bootstrap/Spinner';


export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [memberRequests, setMemberRequests] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    let decision = false;
    let navigate = useNavigate(); 

    const username = JSON.parse(window.localStorage.getItem('username'));

    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('authorization'));
    }

    const getNotifications = async (id) => {   
        await axiosInstance
            .get(`/notifications/user/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization}, 
            } 
            )
            .then((response) => {
                setNotifications(response.data.notifications);
                //console.log(response);     
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };

    const getAllProjectRequests = async () => {
        // Get projects that user has created
        const projects = await axiosInstance
            .get('/users/createdProjects', {
                    headers: {'authorization': 'Bearer ' + authorization}, 
                }
            )
            .then((response) => {            
                return response.data.projects;
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });

        // Based on user-created projects, get the member requests for each project
        // Store all the member requests in an array where each element represents a different project
        const requests = [];
        
        for(let i = 0; i < projects.length; i++) {
            const project = projects[i];
            await axiosInstance
            .get(`/projects/${project.id}/requests`,{
                headers: {'authorization': 'Bearer ' + authorization}, 
            }
            )
            .then((response) => {
                const projectName = project.name;
                const projectRequests = response.data.memberRequests;

                // old one (project name is listed once)
                Array.isArray(projectRequests) && projectRequests.length && requests.push({projectName: project.name, projectRequests: response.data.memberRequests});
                setIsLoading(false);
                // new one (project name is listed multiple times)
                //projectRequests.map((projectRequest) => requests.push([projectName, projectRequest]));      
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
        }
        setMemberRequests(requests);
    }
        
    useEffect(() => {
        getNotifications(id);
        getAllProjectRequests(); 
    }, []);

    const AcceptButton = async (id) => {  
        await axiosInstance
            .delete(`/projects/requests/${id}` , {headers: {'authorization': 'Bearer ' + authorization}, data: {decision: true}
            } 
            )
            .then((response) => {
                alert("User was accepted!");
                window.location.reload();         
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });        
    };

    const DeclineButton = async (id) => {
        await axiosInstance
            .delete(`/projects/requests/${id}` , {headers: {'authorization': 'Bearer ' + authorization}, data: {decision: false}
            } 
            )
            .then((response) => {
                alert("User was accepted!");  
                window.location.reload();          
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };

    console.log(memberRequests);
    console.log(notifications);

    return (
        <section id="header">  
        <Container>        
            <Row>
                <Col>
                    <h1 className="text-info">Notifications</h1> 
                        {notifications?.map((notification) => {
                            return(
                                <Card className = "notification-card">
                                    <Card.Header>{notification.type}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            {' '}
                                            {notification.subject}{' '}              
                                        </Card.Title>
                                        <Card.Text>
                                        {notification.body}
                                        </Card.Text>    
                                    </Card.Body>
                                    <Card.Footer className="text-muted">{notification.time.substring(0,10)}</Card.Footer>
                                </Card>
                            );
                        }
                        )}
                </Col>
                <Col>
                </Col>
                
                <Col>
                <h1 className="text-info">Member Approval</h1>
                <div> 
                    {isLoading ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner> :
                    memberRequests.map(outerArray => {
                        return outerArray.projectRequests.map(innerArray => (         
                                <div>
                                    <Card border="primary" style={{ width: '23rem' }}>
                                        <Card.Header>Project Name: {outerArray.projectName}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{innerArray.username}</Card.Title>
                                            <Card.Text>
                                                {innerArray.message}
                                            </Card.Text>
                                            <Card.Link className="mb-2 text-muted" href={"/users/" + innerArray.username}>Link to Profile</Card.Link>  
                                        </Card.Body>
                                        <Card.Body>
                                            <Button variant="outline-info" type="submit" onClick={() => AcceptButton(innerArray.id)} >
                                                Accept
                                            </Button>{'    '}
                                            <Button variant="outline-info" type="submit" onClick={() => DeclineButton(innerArray.id)} >
                                                Decline
                                            </Button>
                                        </Card.Body>
                                    </Card>    
                                    <br />                 
                                </div>
                        ))    
                    })} 
                
                </div>
                </Col>             
            </Row>                           
        </Container>
        </section>
      );
}
