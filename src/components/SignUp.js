import React from 'react';
import { Link } from "react-router-dom";
import picLogScreen from '../assets/picLogScreen.png'
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import './SignUp.css';

export default function SignUp() {
    return (
        <Container id="main-container" className="d-grid h-100">
            <Row>
                <Col sm={7}>
                    <img class="info-Banner" src={picLogScreen} alt="picLogScreen"/>
                </Col>

                <Col sm={4}>
                    <Form>
                        <h1 className="header-css">Register Account</h1>
                        <h6>For the purpose of industry regulation, your details are required.</h6>
  
                    <Form.Group className="mb-3" controlId="form-Basic-Fullname">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control className="name-input-css" type="name" placeholder="Enter full name" />
                    </Form.Group>
  
                    <Form.Group className="mb-3" controlId="form-Basic-Fullname">
                        <Form.Label>Sex</Form.Label>
                        <Form.Check label="Male"/>
                        <Form.Check label="Female"/>
                    </Form.Group>
   
                    <Form.Group className="mb-3" controlId="form-Basic-Email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
  
                    <Form.Group className="mb-3" controlId="form-Basic-Password">
                        <Form.Label>Create Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"/>
                        <Form.Text id="password-Help-Block" muted>
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
  
                    <Form.Group className="mb-3" controlId="form-Basic-Password">
                        <Form.Label>Submit Password Again</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"/>
                    </Form.Group>
  

                    <Form.Group className="mb-3" controlId="submit-form">
                        <Button variant="outline-info" type="submit">
                            Submit
                        </Button> 
                    </Form.Group>
  
                    <Form.Group className="mb-3" controlId="link-to-homepage">
                        <Button variant="secondary" type="submit">
                            Go back to homepage
                        </Button>
                    </Form.Group>  
                    </Form>
                </Col>
            </Row>
        </Container>
    ); 
}