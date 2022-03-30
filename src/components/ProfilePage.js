import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const user = JSON.parse(window.localStorage.getItem('username'));
    const authorization = JSON.parse(window.localStorage.getItem('token'));
    //const [userInfo, setUserInfo] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [links, setLinks] = useState([]);
    const [interests, setInterests] = useState([]);
    const [skills, setSkills] = useState([]);
    let navigate = useNavigate(); 
    

    useEffect(() => {
        axiosInstance
            .get(`/users/${user}` , {
                headers: {authorization}, 
                firstName: firstName,
                lastName : lastName,
                email : email,
                gender : gender,
                bio: bio,
                occupation: occupation,
                links: links,
                interests: interests,
                skills: skills

            } 
                )
            .then((response) => {
                const {firstName, lastName, gender, email, bio, occupation, links, interests, skills} = response.data;
              
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setGender(response.data.gender);
                setBio(response.data.bio);
                setOccupation(response.data.occupation);
                setLinks(response.data.links);
                setInterests(response.data.interests);
                setSkills(response.data.skills);

                console.log(response);
                console.log(response.data.firstName);
                console.log(lastName);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
        
    }, []);

    const editProfile = async (e) => {
        e.preventDefault();
        setError(false); 
        setErrorMessage(''); 
            axiosInstance
                .put(`/users/${user}` , {
                    headers: {authorization} , 
                    firstName: firstName,
                    lastName : lastName,
                    email : email,
                    gender : gender,
                    bio: bio,
                    occupation: occupation,
                    links: links,
                    interests: interests,
                    skills: skills
                
                })
                .then((response) => {

                    alert("Profile was edited successfully!");
                    navigate(`/users/${user}`);
                    console.log(response);
                    
            
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
                
                <Form>
                <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" defaultValue = {firstName} readOnly />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" defaultValue = {lastName} readOnly />
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" defaultValue = "Male" readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue = {email} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Occupation</Form.Label>
                <Form.Control type="text" defaultValue = {occupation} onChange = {(e) => (setOccupation(e.target.value))}/>
                </Form.Group>
                </Form>
                       
                </Col>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {bio} onChange = {(e) => (setBio(e.target.value))}/>
                    </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Programming Languages</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {skills} onChange = {(e) => (setSkills(e.target.value))}/>
                    </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col></Col>
                <Col><Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Interest </Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {interests} onChange = {(e) => (setInterests(e.target.value))}/>
                    </Form.Group>
                    </Form></Col>
                <Col><Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Contact Information</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {links} onChange = {(e) => (setLinks(e.target.value))}/>
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
                        <Button variant="outline-info" type="submit" onClick={editProfile} >
                            Save
                        </Button> 
                    </Form.Group>

            </div>
                            
        </Container>
        
        </section>
   


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

                