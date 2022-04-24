import React, { useContext, useState } from 'react';

import { Form, Button, } from 'react-bootstrap';
import './ProjectCreation.css';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';


export default function ProjectCreation() {

    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('token'));
    }

    const projectClick = async () => {
        const data = {
            name: name,
            tags: tags.split(','),
            description: description,
            skills: skills.split(','),

        }
        if (links.length) {
            console.log('gonna add links now');
            data[links] = links.split(',');

        }
        axiosInstance

            .post('/projects', data, {
                headers: { 'authorization': 'Bearer ' + authorization },
            })
            .then(() => {
                alert("Project has been created!");
                // navigate(`/projects/${id}`);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrorMessage(err.response.data.msg);
                setError(true);
            });
    };

    return (
        <>
            <div className="project-add-form">
                <div className="name-description-container" style={{ flex: 1 }}>
                    <div className="form-group">
                        <label for="name">Project Title</label>
                        <input className="form-control"
                            id="name"
                            type="text"
                            placeholder="Enter Project Title"
                            onChange={(e) => (setName(e.target.value))}
                        />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                        <label for="description">Description</label>
                        <textarea className="form-control"
                            id="description"
                            style={{ height: '100%' }}
                            type="text"
                            placeholder="Enter Project Description"
                            onChange={(e) => (setDescription(e.target.value))}
                        />
                    </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label for="tags">Tags</label>
                    <textarea className="form-control"
                        style={{ height: '100%' }}
                        id="tags"
                        type="text"
                        placeholder="Enter Project Tags and separate with commas. Ex:( Web Programming, Game Design )"
                        onChange={(e) => (setTags(e.target.value))}
                    />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label for="skills">Skills</label>
                    <textarea className="form-control"
                        style={{ height: '100%' }}
                        id="skills"
                        type="text"
                        placeholder="Enter Project Skills and separate with commas. Ex:( c++, javascript, react )"
                        onChange={(e) => (setSkills(e.target.value))}
                    />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label for="links">Links</label>
                    <textarea className="form-control"
                        style={{ height: '100%' }}
                        id="links"
                        type="text"
                        placeholder="Enter Project Links related to the project if needed"
                        onChange={(e) => (setLinks(e.target.value))}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <button className="btn btn-primary form-element" onClick={projectClick} style={{ padding: '8px 16px' }}>Submit</button>
                {error && <small style={{ color: 'red' }} class="form-text text-muted">{errorMessage}</small>}
            </div>

        </>

    );
}
