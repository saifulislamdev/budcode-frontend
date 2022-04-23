import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import { Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';

export default function Feed() {
    const [projectData, setProjectData] = useState([]);
    const [updateInput, setUpdateInput] = useState({ subject: '', body: '', project: '' })
    const username = JSON.parse(window.localStorage.getItem('username'));

    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('token'));
    }

    const handleInputChange = ({ target: { name, value } }) => {
        setUpdateInput({
            ...updateInput,
            [name]: value,
        })
    }

    const handleAddUpdate = () => {
        console.log('meow');
        axiosInstance.post(`/projects/${updateInput.project}/updates`, { subject: updateInput.subject, body: updateInput.body }, { headers: { 'authorization': 'Bearer ' + authorization } }).then((res) => {
            console.log('res-post:', res);
        })
    }

    const getProjectsList = () => {
        axiosInstance.get(`/users/${username}`).then((res) => {
            setProjectData(res.data.projectMemberships);
        })
    }

    useEffect(() => {
        getProjectsList();
    }, [])

    return (
        <div className="post-app-container">
            <div className="postapp">
                <div className="page-title" >
                    <h1>Feed</h1>
                </div>
                <div className="project-form">
                    <div className="form-group form-element">
                        <select name="project" onChange={handleInputChange} className="form-select">
                            {projectData?.map((project) =>
                                <option value={project.projectId}>{project.projectName}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group form-element">
                        <input name="subject" type="text" className="form-control" placeholder="Title" value={updateInput.subject} onChange={handleInputChange} />
                    </div>
                    <div className="form-group  form-element">
                        <input name="body" type="textarea" className="form-control" placeholder="Updates" value={updateInput.body} onChange={handleInputChange} />
                    </div>
                    <button className="btn btn-primary form-element" onClick={handleAddUpdate}>Post</button>
                </div>
            </div>
        </div>
    );
}