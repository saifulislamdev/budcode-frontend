import React, {useContext, useEffect, useState} from 'react';
import './Notification.css';
import { Container, Form, Button, Row, Col, Card, DropdownButton, Dropdown} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../util/config';
import { boolean } from 'yup';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [memberRequests, setMemberRequests] = useState([]);
    

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {id} = useParams();
    let decision = false;

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
        projects.map(async (project) => {
            await axiosInstance
                .get(`/projects/${project.id}/requests`,{
                    headers: {'authorization': 'Bearer ' + authorization}, 
                }
                )
                .then((response) => {
                    const projectName = project.name;
                    const projectRequests = response.data.memberRequests;
                    Array.isArray(projectRequests) && projectRequests.length && requests.push({projectName: project.name, projectRequests: response.data.memberRequests});
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response);
                    setErrorMessage(err.response.data.msg); 
                    setError(true);
                });
        })
        setMemberRequests(requests);
    }
    
    console.log(memberRequests);
    // const getProjectRequest = async(id) => {
    //     await axiosInstance
    //         .get(`/projects/${id}/requests`,{
    //             headers: {'authorization': 'Bearer ' + authorization}, 
    //         }
    //         )
    //         .then((response) => {
    //             setMemberRequests(response.data.memberRequests);
    //             //console.log(response);
    //             //console.log(memberRequests);
                
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             console.log(err.response);
    //             setErrorMessage(err.response.data.msg); 
    //             setError(true);
    //         });
    // };

    

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
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };

    return (
        <section id="header">  
        <Container>        
            <Row>
                <Col>
                    <h1 className="text-info">Notifications</h1> 
                        {notifications?.map((notification) => {
                            return(
                                <Card>
                                    <Card.Header>{notification.type}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                        <p>
                                            {' '}
                                            {notification.subject}{' '}
                                            
                                        </p>
                                        <footer className="blockquote-footer">
                                            {notification.body}
                                        </footer>
                                        </blockquote>
                                    </Card.Body>
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
        {console.log(memberRequests)}
                
                {memberRequests?.map((memberRequest) => {
               
                   return (
                  

                

                   <div>
                        <Form.Group className="mb-3" controlId="submitform">
                            <Form.Control type="text" defaultValue = {memberRequest?.projectName} readOnly />
                            <Form.Control type="text" defaultValue = {memberRequest?.projectRequests} readOnly />
                            <Button variant="outline-info" type="submit" onClick={() => AcceptButton(memberRequest.id)} >
                                Accept
                            </Button> {'    '}
                            <Button variant="outline-info" type="submit" onClick={() => DeclineButton(memberRequest.id)} >
                                Decline
                            </Button>
                        </Form.Group>
                    </div>
                    );
                }     
            )} 
      
        </div>
                </Col>             
            </Row>                           
        </Container>
        </section>
      );
}


 {/*
            {memberRequests?.map((memberRequest, index) => (
              <option key={`project-option-${index}`} value={memberRequest.id}>
                
                {memberRequest.username}
              </option>
            
               
            ))}
          <Form.Group className="mb-3" controlId="submitform">
                        
                        <Button variant="outline-info" type="submit" onClick={AcceptButton} >
                            Accept
                        </Button> {'    '}
                        <Button variant="outline-info" type="submit" onClick={DeclineButton} >
                            Decline
                        </Button>
                </Form.Group>


            </div>*/}
