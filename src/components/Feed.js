import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';

export default function Feed() {
  const [projectData, setProjectData] = useState([]);
  const [updateInput, setUpdateInput] = useState({
    subject: '',
    body: '',
    project: '',
  });

  const username = JSON.parse(window.localStorage.getItem('username'));

  const navigate = useNavigate();

  let { authorization, setUpdatesList, updatesList } = useContext(UserContext);
  if (!authorization) {
    authorization = JSON.parse(window.localStorage.getItem('token'));
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const handleAddUpdate = () => {
    const { projectId, projectName } = projectData.find(
      (item) => item.projectId === parseInt(updateInput.project)
    );
    const { subject, body } = updateInput;
    const update = {
      projectId,
      project_name: projectName,
      subject,
      body,
      author: username,
      time_posted: new Date().toLocaleString('en-US'),
    };

    const sortedData = [...updatesList, update].sort((a, b) => {
      return new Date(a.time_posted) < new Date(b.time_posted) ? 1 : -1;
    });
    setUpdatesList(sortedData);
    localStorage.setItem('updates', JSON.stringify(sortedData));

    axiosInstance
      .post(
        `/projects/${updateInput.project}/updates`,
        { subject, body },
        { headers: { authorization: 'Bearer ' + authorization } }
      )
      .then((res) => {
        console.log('res-post:', res);
      });
  };

  const getProjectsList = () => {
    axiosInstance.get(`/users/${username}`).then((res) => {
      setProjectData(
        res.data.projectMemberships.map((memberShip) => {
          return {
            ...memberShip,
            project_name: memberShip.project_name,
          };
        })
      );

      setUpdateInput({
        ...updateInput,
        project: res.data.projectMemberships[0].projectId,
      });
    });
  };

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <>
      <div className='page-title-container'>
        <div className='page-title'>
          <h1>Feed</h1>
        </div>
      </div>
      <div className='feed-content'>
        <div className='feed-fields'>
          <div className='project-input-fields'>
            <div className='form-group form-element'>
              <h2 className='grey-text-feed'>Choose A Project To Post An Update!</h2>
              <select
                name='project'
                onChange={handleInputChange}
                className='form-select'
              >
                {projectData
                  ?.map((list) => {
                    return { ...list, project_name: list.projectName };
                  })
                  ?.map((project, index) => (
                    <option
                      key={`project-option-${index}`}
                      value={project.projectId}
                    >
                      {project.project_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='form-group form-element'>
              <input
                name='subject'
                type='text'
                className='form-control'
                placeholder='Title'
                value={updateInput.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group  form-element'>
              <input
                name='body'
                type='textarea'
                className='form-control'
                placeholder='Anything new about your project?'
                value={updateInput.body}
                onChange={handleInputChange}
              />
            </div>
            <button
              className='btn btn-primary form-element'
              onClick={handleAddUpdate}
            >
              Post
            </button>
          </div>

          <div className='project-updates'>
            {updatesList?.map((update, index) => {
              return (
                <div
                  key={`project-update-item-${index}`}
                  className='update-card'
                >
                  <div className='custom-card-header'>
                    <h2>{update.project_name}</h2>
                    <h4>{update.author}</h4>
                  </div>
                  <div className='custom-card-body'>
                    <h2>{update.subject}</h2>
                    <h4>{update.body}</h4>
                  </div>
                  <div className='custom-card-footer'>
                    <p>{update.time_posted}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='all-projects-list'>
          <div className='project-list-heading-container'>
            <div className='project-list-heading'>
              <h3>My Projects</h3>
            </div>
          </div>
          <div className='only-project-cards'>
            {projectData
              ?.map((list) => {
                return { ...list, project_name: list.projectName };
              })
              ?.map((project) => (
                <div
                  key={`project-link-${project.projectId}`}
                  className='project-link-card'
                  onClick={() => navigate(`/projects/${project.projectId}`)}
                >
                  <div className='project-name'>
                    <h3>{project.project_name}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
