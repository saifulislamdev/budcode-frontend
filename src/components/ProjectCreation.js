import React, { useContext, useState } from 'react';

import { ProjectCreationContext } from '../util/context';
import { Form, Button,} from 'react-bootstrap';
import './ProjectCreation.css';
import { axiosInstance } from '../util/config';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import {UserContext} from '../util/context';


export default function ProjectCreation(){

    const [name, setName] = useState('');
    const [leader, setLeader] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('token'));
    }
    
    
    let navigate = useNavigate(); 
    
    const projectSchema = Yup.object().shape({
        name: Yup.string().max(30).required(),
        leader: Yup.string().max(30).required(),
        tags: Yup.string().max(30).required(),
        description: Yup.string().max(30).required(),
        skills: Yup.string().max(30).required(),
        
    });

    const projectClick = async (e) => {
        e.preventDefault();
        setError(false); 
        setErrorMessage(''); 
        const isValid = await projectSchema.isValid({
            name: name,
            leader: leader,
            tags: tags,
            description: description,
            skills: skills,
        });

        if (isValid) {
            axiosInstance
            
                .post('/projects', {
                    name: name,
                    leader: leader,
                    tags: tags,
                    description: description,
                    skills: skills,
                
                }, {
                    headers: {'authorization': 'Bearer ' + authorization},
                })
                .then((response) => {
                    alert("Project has been created!");
                    navigate('/projects/:id');
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response);
                    setErrorMessage(err.response.data.msg); 
                    setError(true);
                });
        } else {
            setError(true); 
            setErrorMessage('One or more input is invalid');
        }
    };

    return (
        <Form>
            <Form.Group className = "Title" controlId = "formTitle">
                <Form.Label>Project Title</Form.Label>
                <Form.Control className = "name-input-css"
                              type = "name"
                              as = "textarea"
                              placeholder = "Enter Project Title"
                              onChange = {(e) => (setName(e.target.value))}
                />
             </Form.Group>

             <Form.Group className = "Leader" controlId = "formLeader">
                <Form.Label>Project Leader Description</Form.Label>
                <Form.Control className = "name-input-css"
                              type = "name"
                              as = "textarea"
                              rows = '5'
                              placeholder = "Enter Leader Description"
                              onChange = {(e) => (setLeader(e.target.value))}
                />
             </Form.Group>

             <Form.Group className = "Member" controlId = "formMembers">
                <Form.Label>Project Members</Form.Label>
                <Form.Control className = "name-input-css"
                              type = "name"
                              as = "textarea"
                              rows = '5'
                              placeholder = "Enter Project Members"
                              onChange = {(e) => (setTags(e.target.value))}
                />
             </Form.Group>

             <Form.Group className = "Description" controlId = "formDescription">
                <Form.Label>Project Description</Form.Label>
                <Form.Control className = "name-input-css"
                              type = "name"
                              as = "textarea"
                              rows = '15'
                              placeholder = "Enter Project Description"
                              onChange = {(e) => (setDescription(e.target.value))}
                />
             </Form.Group>

             <Form.Group className = "Requirement" controlId = "formRequirements">
                <Form.Label>Project Requirements</Form.Label>
                <Form.Control className = "name-input-css"
                              type = "name"
                              as = "textarea"
                              rows = '10'
                              placeholder = "Enter Requirements"
                              onChange = {(e) => (setSkills(e.target.value))}
                />
             </Form.Group>

             <Form.Group className="Submit" controlId="submitform">
                        <Button variant="outline-info" to='/projects/:id' type="submit" onClick={projectClick}>
                            Submit
                        </Button> 
                        {error ? (
                                <p style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            ) : null}
                    </Form.Group>
                    

        </Form>
    
    );
}
