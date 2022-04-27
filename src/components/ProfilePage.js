import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import Rating from './Rating';


export default function ProfilePage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const username = JSON.parse(window.localStorage.getItem('username'));
    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('authorization'));
    }
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [occupation, setOccupation] = useState('');
    const [links, setLinks] = useState([]);
    const [interests, setInterests] = useState([]);
    const [skills, setSkills] = useState([]);
   const [canEdit, setCanEdit] = useState(null);
    let navigate = useNavigate(); 
    const {id} = useParams();
   
    const getUser = async (id) => {
        axiosInstance
            .get(`/users/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization}, 
            } 
            )
            .then((response) => {
                const {firstName, lastName, gender, email, bio, occupation, links, interests, skills} = response.data;
                setCanEdit(response.data.canEdit);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setBio(response.data.bio);
                setOccupation(response.data.occupation);
                setLinks(response.data.links);
                setInterests(response.data.interests);               
                setSkills(response.data.skills);
                console.log(response);
                console.log(response.data.firstName);
                console.log(lastName);
                console.log(response.data.canEdit);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };
    
   useEffect(() => {
    console.log(username);
    console.log(authorization);
    getUser(id);  
}, []);

   const editProfile = async (e) => {
    e.preventDefault();
    setError(false); 
    console.log(canEdit);    
    if(canEdit == true) {
            const putData = {
                firstName: firstName,
                lastName : lastName,
                email : email,
                bio: bio,
                occupation: occupation,
                links: links,
                interests: interests,
                skills: skills,
            };
            try {
                const response = await axiosInstance.put(`/users/${id}`, putData, {
                    headers: {'authorization': 'Bearer ' + authorization}
                },
                );
                
                alert("Profile was edited successfully!");
                console.log(response);
                console.log(id);           
            }
            catch(err) {
                console.log(err);
                    console.log(err.response);
                    setErrorMessage(err.response.data.msg); 
                    setError(true);
            }
        }  
    };
   
    return (
        <section id="header">          
        <Container>               
            {
                !canEdit && (
                    <div>
                    <Row>
                        <Col>           
                            <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder={firstName} readOnly />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder={lastName} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder={email} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control type="text" placeholder={occupation} readOnly />
                            </Form.Group>
                            </Form>       
                        </Col>

                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>About Me</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {bio} readOnly />
                            </Form.Group>
                            </Form>
                        </Col>

                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Programming Languages</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {skills} readOnly/>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Interest </Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {interests} readOnly/>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {links} readOnly/>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    </div>
                )
            }
            {
                canEdit && (
                    <div>
                    <Row>
                        <Col>           
                            <Form>
                            <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue = {firstName} onChange = {(e) => (setFirstName(e.target.value))}/>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue = {lastName} onChange = {(e) => (setLastName(e.target.value))}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" defaultValue = {email} onChange = {(e) => (setEmail(e.target.value))}/>
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
                            <Form.Control as="textarea" rows={3} placeholder="Tell me about yourself." defaultValue = {bio} onChange = {(e) => (setBio(e.target.value))}/>
                            </Form.Group>
                            </Form>
                        </Col>

                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Skills</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter your skills and separate with commas. Ex: (c++, javascript, react)" defaultValue = {skills} onChange = {(e) => (setSkills(e.target.value))}/>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                    <Row>
                        <Col></Col>
                        <Col><Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Interest </Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter your interests and separate with commas. Ex: (fontend, design, applications)" defaultValue = {interests} onChange = {(e) => (setInterests(e.target.value))}/>
                            </Form.Group>
                            </Form></Col>
                        <Col><Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Contact Information</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter your contact information and separate with commas." defaultValue = {links} onChange = {(e) => (setLinks(e.target.value))}/>
                            </Form.Group>
                            </Form></Col>
                    </Row>
                        <Form.Group className="mb-3" controlId="submitform">
                            <Button variant="outline-info" type="submit" onClick={editProfile}>
                                Update
                            </Button> 
                        </Form.Group>
                    </div>
                )
            }


        </Container>     
        {id !== username && <Rating firstName={firstName} userId={id} /> }
        </section>
      );

}





                