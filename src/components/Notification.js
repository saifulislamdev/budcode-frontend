import React, {useContext, useEffect, useState} from 'react';
import './Notification.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../util/config';

export default function Notification() {
    const [notification, setNotifications] = useState([]);
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
                
                console.log(response);
                
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
        console.log(allNotifications);
        
    }, []);

    const AcceptButton = async (id) => {
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
   
    const [allNotifications, setAllNotifications] = useState([1, 2, 3, 4, 5]);
   
    const removeItem = (index) => {
        setAllNotifications([
                   ...allNotifications.slice(0, index),
                   ...allNotifications.slice(index + 1)
                 ]);
    }


    return (
        <section id="header">  
        <Container>
                   
          <Row>
                <Col>
                <h1 className="text-info">Notifications</h1> 
             
                {allNotifications?.map((allNotification) => {
                
                   return(
                        
                    <div>
                    <div className="alert alert-info" role="alert">
                        {allNotification}      
                    </div> 
                    
                    <Button variant="outline-info" type="submit" onClick={removeItem} >
                    Remove
                </Button>
                </div>
                    );
                }
                
                )} 
                
                </Col>
                <Col>
                </Col>
                <Col>
                <h1 className="text-info">Member Approval</h1>
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
                </div>
                </Col>             
            </Row>                           
        </Container>
        </section>
      );
}