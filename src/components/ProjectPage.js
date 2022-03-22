import React from 'react';
import './ProjectPage.css';
import {Navbar, Container, NavLink, Nav, Form, Button,} from 'react-bootstrap'

export default function ProjectPage() {
    return (
        <div className='ProjectCreate'>
          
          
    
    <img src ="../../user07b.svg" className="profilepic"></img>
            
    <br></br>
    <Form>
      <Form.Group className="Leader" controlId="formLeader">
        <Form.Label>Project Leader Description</Form.Label>
        <Form.Control type="leader" placeholder="Enter leader description" as ="textarea" rows="5"/>
      </Form.Group>
    
      <Form.Group className="Member" controlId="formMember">
        <Form.Label>Current Members</Form.Label>
        <Form.Control type="member" placeholder="Members" as ="textarea" rows ="5"/>
      </Form.Group>
    
      <Form.Group className="Description" controlId="formDesc">
        <Form.Label>Project Description</Form.Label>
        <Form.Control type="project" placeholder="Enter project description" as ="textarea" rows = "15" />
      </Form.Group>
    
      <Form.Group className="Requirement" controlId="formReq">
        <Form.Label>Project Requirement</Form.Label>
        <Form.Control  type="requirement" placeholder="Enter project requirements" as ="textarea" rows ="10"/>
      </Form.Group>
    
      <Button className = "Submit" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
         
         
        </div>
      );

}