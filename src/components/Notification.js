import React, {useContext, useEffect, useState} from 'react';
import './Notification.css';
import { Container, Form, Button, Row, Col, Card} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../util/config';

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [memberRequests, setMemberRequests] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {id} = useParams();
    const [decision, setDecision] = useState(null);

    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('authorization'));
    }

   
    const getNotifications = async (id) => {
        
        await axiosInstance
            .get(`/notifications/user/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization,
                'Content-Type': 'application/json'}, 
            } 
            )
            .then((response) => {
                setNotifications(response.data.notifications);
                console.log(response);
                
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };

    const getProjects = async(id) => {
        await axiosInstance
            .get('/users/createdProjects',{
                headers: {'authorization': 'Bearer ' + authorization}, 
            }
            )
            .then((response) => {

              
                setProjects(response.data.projects);
                console.log(response);
                
                
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
            console.log(projects);
            
    };

    const getProjectRequest = async(id) => {
        await axiosInstance
            .get(`/projects/${13}/requests`,{
                headers: {'authorization': 'Bearer ' + authorization}, 
            }
            )
            .then((response) => {
                setMemberRequests(response.data.memberRequests);
                console.log(response);
                console.log(memberRequests);
                
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };


    useEffect(() => {
        getNotifications(id);
        getProjects(id);
        console.log(authorization); 
    }, []);




    const AcceptButton = async (id) => {
        console.log(id);
        await axiosInstance
            .delete(`/projects/request/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization,
                'Content-Type': 'application/json'}, 
                decision: decision,
            } 
            )
            .then((response) => {
                setDecision(true);
                console.log(response);
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
            .delete(`/projects/request/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization,
                'Content-Type': 'application/json'}, 
                decision: decision,
            } 
            )
            .then((response) => {
                setDecision(false);
                console.log(response);
                alert("User was declined!");
                
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
                
        <div className='form-group form-element'>
          <select
            name='project'
            onChange={getProjectRequest}
            className='form-select'
          >
            {projects?.map((project, index) => (
              <option key={`project-option-${index}`} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className='form-group form-element'>
       

       
                {memberRequests?.map((memberRequest) => {
                
                   return(
                        
                    <div>
                     <Form.Group className="mb-3" controlId="submitform">
                        <Form.Control type="text" defaultValue = {memberRequest.username} readOnly />
                        <Button variant="outline-info" type="submit" onClick={() => AcceptButton(memberRequest.id)} >
                            Accept
                        </Button> {'    '}
                        <Button variant="outline-info" type="submit" onClick={() => DeclineButton(id)} >
                            Decline
                        </Button>
                    </Form.Group>
                    
                    
                </div>
                    );
                }
                
            )} 
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


                {/*
                <div>
                    <Form.Group className="mb-3" controlId="submitform">
                        <Form.Control type="text" defaultValue = "Name" readOnly />
                        <Button variant="outline-info" type="submit" onClick={AcceptButton} >
                            Accept
                        </Button> {'    '}
                        <Button variant="outline-info" type="submit" onClick={DeclineButton} >
                            Decline
                        </Button>
                    </Form.Group>
        </div>*/}
        </div>
                </Col>             
            </Row>                           
        </Container>
        </section>
      );
}