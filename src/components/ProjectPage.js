import React from 'react';
import './ProjectPage.css';
import {useContext, useEffect, useState} from 'react';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import {UserContext} from '../util/context';
import { axiosInstance } from '../util/config';
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectPage() {

    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(false);
    const [canUserEdit, setCanUserEdit] = useState(null);
    const [canUserFollow, setCanUserFollow] = useState(null);
    const [canUserRequest, setCanUserRequest] = useState();
    const [hasUserRequested, setHasUserRequested] = useState();
    const [isUserFollowing, setIsUserFollowing] = useState();
    const [isUserAMember, setIsUserAMember] = useState();
    const [isValidUser, setIsValidUser] = useState();
    const [members, setMembers] = useState([]);
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {id} = useParams();

    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('authorization'));
    }
    let token = authorization;
    let navigate = useNavigate(); 

    const getProject = async (id) => {
        axiosInstance
            .get(`/projects/${id}` , {
                headers: {'authorization': 'Bearer ' + authorization}, 
            } 
            )
            .then((response) => {
                setName(response.data.name);
                setTags(response.data.tags);
                setDescription(response.data.description);
                setSkills(response.data.skills);
                setLinks(response.data.links);
                setCanUserEdit(response.data.canUserEdit);
                setCanUserFollow(response.data.canUserFollow);
                setCanUserRequest(response.data.canUserRequest);
                setHasUserRequested(response.data.hasUserRequested);
                setIsUserFollowing(response.data.isUserFollowing);
                setIsUserAMember(response.data.isUserAMember);
                setIsValidUser(response.data.isValidUser);
                setMembers(response.data.members);
                setStatus(response.data.status);
                console.log(response);
                console.log(response.data.canUserFollow);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });
    };

    useEffect(() => {
        getProject(id);
        console.log(id);
        console.log(authorization);
        
    }, []);

    const editProject = async (e) => {
        e.preventDefault();
        setError(false);  
        console.log(canUserEdit);
        console.log(authorization);
   
            const putData = {
                name: name,
                description: description,
                status: status,
                skills: skills.split(', '),
                tags: tags.split(', '),
                //members: members,
            };
            try {
                const response = await axiosInstance.put(`/projects/${id}`, putData, {
                    headers: {'authorization': 'Bearer ' + authorization,
                        'Content-Type': 'application/json'},
                },
                );       
                alert("Project was updated successfully!");
                console.log(response);          
            }
            catch(err) {
                console.log(canUserEdit);
                console.log(authorization);
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            }      
    };

    const requestJoinProject = async (e) => {
        e.preventDefault();
        setError(false);  
            try {
                const response = await axiosInstance.post(`/projects/${id}/requests`,  {
                    headers: {'authorization': 'Bearer ' + authorization,
                        'Content-Type': 'application/json'},
                },
                );       
                alert("You have successfully requested to join!");
                console.log(response);          
            }
            catch(err) {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            }      
    };

    const followProject = async (e) => {
        e.preventDefault();
        setError(false);  
        
        console.log(canUserFollow);
        axiosInstance
            .post(`/projects/${id}/follow` , {
                headers: {'authorization': 'Bearer ' + authorization}, 
            } 
            )
            .then((response) => {
               
                console.log(response);
                alert("You have successfully followed this project!");
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                console.log(authorization);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            });    
        
              
    };

    /*try {
                const response = await axiosInstance.post(`/projects/${id}/follow`,  {
                    headers: {'authorization': 'Bearer ' + authorization}
                },
                );       
                alert("You have successfully followed this project!");
                console.log(response);          
            }
            catch(err) {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg); 
                setError(true);
            } */
    //POST /projects/:id/follow
    //POST /projects/:id/requests


  
    return (
        <section id="header">
            <Container>
                {canUserEdit && (
                    <div>
                    <Row>               
                        <Col>  
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control type="text" defaultValue = {name} onChange = {(e) => (setName(e.target.value))}/>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col> 
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {description} onChange = {(e) => (setDescription(e.target.value))}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Members</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {/*members*/''} /*onChange = {(e) => (setMembers(e.target.value))}*//>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Requirements</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {skills} onChange = {(e) => (setSkills(e.target.value))}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" defaultValue = {status} onChange = {(e) => (setStatus(e.target.value))}/>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Tags</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {tags} onChange = {(e) => (setTags(e.target.value))}/>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>   
                    <Form.Group className="mb-3" controlId="submitform">
                            <Button variant="outline-info" type="submit" onClick={editProject}>
                                Update
                            </Button> 
                    </Form.Group>
                    {error ? (
                                <p style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            ) : null}            
                    </div>
                )}

                {!canUserEdit && (
                    <div>
                    <Row>               
                        <Col>  
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group>
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control type="text" defaultValue = {name} readOnly/>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            {isValidUser && (
                            <Form.Group>
                            <Button variant="outline-info" type="submit" onClick={followProject}>Follow</Button>{' '}
                            <Button variant="outline-info" type="submit" onClick={requestJoinProject}>Interested</Button>{' '}
                            </Form.Group>
                            )}           
                        </Col>
                    </Row>
                    <Row>
                        <Col> 
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {description} readOnly/>
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
                            <Form.Label>Project Requirements</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {skills} readOnly/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" defaultValue = {status} readOnly/>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Project Tags</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue = {tags} readOnly/>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    {error ? (
                                <p style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            ) : null}                   
                    </div>
                )}                       
            </Container>      
        </section>         
    );
}