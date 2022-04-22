import React, {useContext, useEffect, useState} from 'react';
import './ProfilePage.css';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import Navbar from "./Navbar";
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../util/config';



export default function ProfilePage() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const username = JSON.parse(window.localStorage.getItem('username'));
    //const authorization = JSON.parse(window.localStorage.getItem('token'));
    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('authorization'));
    }
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
                setGender(response.data.gender);
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
       if (id && id != ':id' ){
        navigate(`/users/${id}`);
        console.log(id);
        console.log(authorization);
        getUser(id);
       }
       else if(authorization && username) {
        navigate(`/users/${username}`);
        console.log(username);
        console.log(authorization);
        getUser(username);
       }
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
                gender : gender,
                bio: bio,
                occupation: occupation,
                links: links,
                interests: interests,
                skills: skills
            };
            try {
                const response = await axiosInstance.put(`/users/${id}`, putData, {
                    headers: {'authorization': 'Bearer ' + authorization}
                },
                );
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setGender(response.data.gender);
                setBio(response.data.bio);
                setOccupation(response.data.occupation);
                setLinks(response.data.links);
                setInterests(response.data.interests);
                setSkills(response.data.skills);

                alert("Profile was edited successfully!");

               //navigate(`/users/${id}`)
                console.log(response);
                console.log(id);
                navigate('/');
              
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
          <Row>
            <Col>           
                <Form>
                <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" defaultValue = {firstName} onChange = {(e) => (setLastName(e.target.value))}/>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" defaultValue = {lastName} onChange = {(e) => (setLastName(e.target.value))}/>
                {/*<Form.Label>Gender</Form.Label>
                <Form.Control type="text" defaultValue = "" readOnly />*/}
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
                    <Form.Control as="textarea" rows={3} defaultValue = {bio} onChange = {(e) => (setBio(e.target.value))}/>
                    </Form.Group>
                    </Form>
                </Col>

                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Programming Languages</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue = {myList} onChange = {(e) => (setSkills(e.target.value))}/>
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
                
            {
                canEdit && (
                    <div className = "edit-save-buttons">
                    <Form.Group className="mb-3" controlId="submitform">
                        <Button variant="outline-info" type="submit" onClick={editProfile}>
                            Update
                        </Button> 
                    </Form.Group>

            </div>
                )
            }                   
        </Container>      
        </section>
      );

}

/*const editProfile = async (id) => { 
        
        console.log(authorization);
            axiosInstance
                .put(`/users/${id}` , {
                    headers: {'authorization': 'Bearer ' + authorization},  
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

                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setBio(response.data.bio);
                    setOccupation(response.data.occupation);
                    setLinks(response.data.links);
                    setInterests(response.data.interests);
                    setSkills(response.data.skills);

                    alert("Profile was edited successfully!");

                    //navigate(`/users/${id}`);
                    console.log(response);
                    
            
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response);
                    setErrorMessage(err.response.data.msg); 
                    setError(true);
                });
         
    };*/



                