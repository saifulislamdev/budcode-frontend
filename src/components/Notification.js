import React, {useContext, useEffect, useState} from 'react';
import './Notification.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../util/config';

export default function Notification() {



    return (

        <section id="header">
            
        <Container>
                   
          <Row>
                <Col>
                <h1 className="text-info">Notifications</h1> 
                <div className="alert alert-info" role="alert">
                This is a info alert—check it out!
                </div>
                <div class="alert alert-danger" role="alert">
                This is a danger alert—check it out!
                </div>   
                </Col>
                <Col>
                </Col>
                <Col>
                <h1 className="p-3 mb-2 bg-info text-white">Member Approval</h1>
                <div>
                
                    <Form.Group className="mb-3" controlId="submitform">
                        <Form.Control type="text" defaultValue = "Name" readOnly />
                        <Button variant="outline-info" type="submit"  >
                            Accept
                        </Button> {'    '}
                        <Button variant="outline-info" type="submit"  >
                            Decline
                        </Button>
                    </Form.Group>


                </div>
                <div className = "edit-save-buttons">
                    

            </div>
                </Col>
                
            </Row>

           

           
                            
        </Container>
        
        </section>
   


      );
}