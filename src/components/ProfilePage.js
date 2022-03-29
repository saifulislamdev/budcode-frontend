import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';

export default function ProfilePage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const user = JSON.parse(window.localStorage.getItem('username'));
    const authorization = JSON.parse(window.localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState({});
   
    useEffect(() => {
        axiosInstance
            .get(`/users/${user}` , {
                headers: {authorization}

            })
            .then((response) => {
                //setUserInfo(response.data.user)
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
        
    }, []);


    return (
        

        <Container>

            
            <div>
            EDIT PROFILE
        
            </div>         
          <Row>
                <Col>
                
                <Form>
                <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"  readOnly />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Readonly input here..." readOnly />
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" placeholder="Readonly input here..." readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Readonly input here..." readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Occupation</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                </Form>
                       
                </Col>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>About Me (bio)</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Languages (skills)</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col></Col>
                <Col><Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Interest (interests)</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form></Col>
                <Col><Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Contact Information (links)</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form></Col>
            </Row>

            <div className = "edit-save-buttons">
            <Form.Group className="mb-3" controlId="submitform">
                        <Button variant="outline-info" type="submit" >
                            Edit
                        </Button> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="submitform">
                        <Button variant="outline-info" type="submit" >
                            Save
                        </Button> 
                    </Form.Group>

            </div>
                            
        </Container>
        
   


      );

}
/*<div className="MyInfo">
                    <div className='Card'>
                        <div className='upper-container'>
                            <div className='image-container2'>
                               
                            </div>
                        </div>
                        <div className="lower-container">
                            <h3>User Information</h3>
                            <p>Full Name:</p>
                            <p>Gender: </p>
                            <p>Email: </p>
                        </div>
                    </div>
                </div>
                
                
                
                
                 

*/ 

                