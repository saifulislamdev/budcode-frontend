import React, {useState} from 'react';
import './ProfilePage.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import picLogScreen from '../assets/picLogScreen.png'

export default function ProfilePage() {
    return (
        <Container>
            <Row>
                <Col>
                
                <Form>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Readonly input here..." readOnly />
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Age</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
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
                    <Form.Label>About Me</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Languages</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col></Col>
                <Col><Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Previous BudCode Projects</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form></Col>
                <Col><Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Contact Information</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    </Form></Col>
            </Row>

            <div classname = "edit-save-buttons">
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

                