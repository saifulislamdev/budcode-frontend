import React from 'react';
import './ProjectPage.css';
import {useContext, useEffect, useState} from 'react';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectPage() {

  
     const authorization = JSON.parse(window.localStorage.getItem('token'));
     let navigate = useNavigate(); 
     /*
     useEffect(() => {
      if(id) {
       
       axiosInstance
           .get(`/projects/${id}` , {
               headers: {authorization}, 
           } 
               )
           .then((response) => {
           })
           .catch((err) => {
               console.log(err);
               console.log(err.response);
               setErrorMessage(err.response.data.msg); 
               setError(true);
           });
      }
}, [id]);*/
  
    return (

      <section id="header">
            
        <Container>
                   
          <Row>               
                <Col>  
                </Col>
                <Col>
                <Form>
                <Form.Group>
                <Form.Label>Project Title</Form.Label>
                <Form.Control type="text" defaultValue = {""} readOnly/>
                </Form.Group>
                </Form>
                </Col>
                <Col>
                <Form.Label></Form.Label>
                <Button variant="outline-info">Follow</Button>{' '}
                <Button variant="outline-info">Interested</Button>{' '}
                </Col>
            </Row>

            <Row>
                <Col> 
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project Leader Description</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project Members</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {""} readOnly/>
                    </Form.Group>
                    </Form>
                </Col>
                <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {""} readOnly/>
                    </Form.Group>
                    </Form>
                </Col>
                <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Project Requirements</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {""} readOnly/>
                    </Form.Group>
                    </Form>
                </Col>
            </Row>

            
                            
        </Container>
        
        </section>
        
    
    );

}