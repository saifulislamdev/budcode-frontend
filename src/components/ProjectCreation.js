import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './ProjectCreation.css';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';
import { v4 as uuid } from 'uuid';

function LinksModal({ show, onHide, links, handleLinksChange, handleRemoveLink, handleAddLink }) {
    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Add/Remove Links for the Project</Modal.Title>
                <Button className="btn btn-primary" onClick={handleAddLink}>
                    Add
                </Button>
            </Modal.Header>
            <Modal.Body>
                {links?.map((link) => {
                    return (
                        <Form.Group key={`link-details-${link?.id}`} className="links-form-group">
                            <div>
                                <Button
                                    className="btn btn-danger remove-link-btn"
                                    onClick={() => handleRemoveLink(link?.id)}
                                >
                                    - Remove Link
                                </Button>
                            </div>

                            <div>
                                <Form.Label> Type</Form.Label>
                                <Form.Control
                                    id={link?.id}
                                    name="type"
                                    onChange={(e) => handleLinksChange(e, link.id)}
                                    type="text"
                                    placeholder="Type (e.g. Github, LinkedIn, etc.)"
                                />
                            </div>
                            <div>
                                <Form.Label>Link </Form.Label>
                                <Form.Control
                                    id={link?.id}
                                    name="link"
                                    onChange={(e) => handleLinksChange(e, link.id)}
                                    type="text"
                                    placeholder="URL (e.g. https://www.google.com/)"
                                />
                            </div>
                        </Form.Group>
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function ProjectCreation() {
    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState([]);
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLinksModalOpen, setLinksModalOpen] = useState(false);

    let { authorization } = useContext(UserContext);
    if (!authorization) {
        authorization = JSON.parse(window.localStorage.getItem('token'));
    }

    const navigate = useNavigate();

    const handleLinksChange = (e, id) => {
        const { name, value } = e.target;
        const currentLinks = [...links];
        const updatedLinks = currentLinks?.map((link) => {
            if (link?.id === id) {
                return {
                    ...link,
                    [name]: value,
                };
            } else return link;
        });

        setLinks(updatedLinks);
    };

    const handleRemoveLink = (id) => {
        const currentLinks = [...links];
        const newLinks = currentLinks.filter((link) => link.id !== id);
        setLinks(newLinks);
    };

    const handleAddLink = () => {
        const data = {
            id: uuid(),
            type: '',
            link: '',
        };
        const currentLinks = [...links];
        currentLinks.push(data);
        setLinks(currentLinks);
    };

    const handleModalClose = () => {
        setLinksModalOpen(false);
    };

    const projectClick = async () => {
        let formattedLinks = [];
        if (links.length) {
            links.forEach((link) => {
                link.id = undefined;
                formattedLinks.push({ ...link });
            });
        }
        const data = {
            name: name,
            tags: tags.split(','),
            description: description,
            skills: skills.split(','),
            links: formattedLinks,
        };
        axiosInstance
            .post('/projects', data, {
                headers: { authorization: 'Bearer ' + authorization },
            })
            .then((res) => {
                alert('Project has been created!');
                navigate(`/projects/${res.data.id}`);
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
            <div className="page-title-container">
                <div className="page-title">
                    <h1>Create A Project</h1>
                </div>
            </div>
            <div className="links-btn-container">
                <button className="btn btn-primary" onClick={() => setLinksModalOpen(true)}>
                    Add Links
                </button>
            </div>
            <div className="project-add-form">
                <div className="name-skills-container" style={{ flex: 1 }}>
                    <div className="form-group">
                        <label htmlFor="name">Project Title</label>
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            placeholder="Enter Project Title"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ height: '100%' }}>
                        <label htmlFor="skills">Skills</label>
                        <textarea
                            className="form-control"
                            style={{ height: '100%' }}
                            id="skills"
                            type="text"
                            placeholder="Enter Project Skills and separate with commas. Ex:( c++, javascript, react )"
                            onChange={(e) => setSkills(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        style={{ height: '100%' }}
                        type="text"
                        placeholder="Enter Project Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="tags-links-container" style={{ flex: 1 }}>
                    <div className="form-group" style={{ height: '100%' }}>
                        <label htmlFor="tags">Tags</label>
                        <textarea
                            className="form-control"
                            style={{ height: '100%' }}
                            id="tags"
                            type="text"
                            placeholder="Enter Project Tags and separate with commas. Ex:( Web Programming, Game Design )"
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <button className="btn btn-primary form-element" onClick={projectClick} style={{ padding: '8px 16px' }}>
                    Submit
                </button>
                {error && (
                    <small style={{ color: 'red' }} class="form-text text-muted">
                        {errorMessage}
                    </small>
                )}
            </div>
            <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">
                                Modal title
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <LinksModal
                links={links}
                show={isLinksModalOpen}
                onHide={handleModalClose}
                handleAddLink={handleAddLink}
                handleRemoveLink={handleRemoveLink}
                handleLinksChange={handleLinksChange}
            />
        </>
    );
}
