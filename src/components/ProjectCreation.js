import logo from '../assets/logo.svg';
import 'ProjectCreation.css';
import React from 'react';


import {Navbar, Container, NavLink, Nav, Form, Button,} from 'react-bootstrap'


function ProjectCreation() {
  return (
    <div className='ProjectCreate'>
      
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">BudCode</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#Searc">Search</Nav.Link>
      <Nav.Link href="#Feed">Feed</Nav.Link>
      <Nav.Link href="#Create">Create</Nav.Link>
      <Nav.Link href="#Profile">Profile</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="#deets"><img src ="../../Bell.svg"></img></Nav.Link>
      <Nav.Link eventKey={2} href="#logout">
        Log Out
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

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

