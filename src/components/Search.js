import React, { useState, useEffect } from 'react';
import { uniq, isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

import './Search.css';
import { axiosInstance } from '../util/config';

export default function Search() {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [queryParams, setQueryParams] = useState({ skills: [], tags: [] });
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const getProjects = () => {
    axiosInstance.get('/projects').then((res) => {
      const data = res.data/* .slice(69, -1) */;
      const uniqueTags = uniq(
        data.flatMap((item) => item.tags.map((tag) => tag.trim()))
      );
      const uniqueSkills = uniq(
        data.flatMap((item) => item.skills.map((skill) => skill.trim()))
      );
      setTags(uniqueTags);
      setSkills(uniqueSkills);
      setProjects(data);
    });
  };

  const handleInputChange = ({ target: { id, name, checked } }) => {
    setQueryParams({
      ...queryParams,
      [id]: { ...queryParams[id], [name]: checked },
    });
  };

  const handleSearch = () => {
    const { skills, tags } = queryParams;
    const skillsFilter = Object.keys(skills).filter(
      (skill) => skills[skill] === true
    );
    const tagsFilter = Object.keys(tags).filter((tag) => tags[tag] === true);

    const url = `/projects?skill[]=${encodeURIComponent(
      skillsFilter
    )}&tag[]=${encodeURIComponent(tagsFilter)}&search=${encodeURIComponent(
      searchQuery
    )}`;
    axiosInstance.get(url).then((res) => {
      setProjects(res.data);
    });
  };

  const navigateToProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    const { skills, tags } = queryParams;
    (!isEmpty(skills) || !isEmpty(tags)) && handleSearch();
  }, [queryParams]);

  return (
    <div className='search-page'>
      <div className='skills-tag-container'>
        {/* Skills card */}
        {!!skills?.length && (
          <div className='skill-tag-card'>
            <h2>Skills</h2>
            {skills?.map((skill, index) => (
              <div key={`tag-${index}`} className='project-form-element'>
                <input
                  id='skills'
                  name={skill}
                  type='checkbox'
                  onChange={handleInputChange}
                />
                <label htmlFor={skill}>{skill}</label>
              </div>
            ))}
          </div>
        )}

        {/* Tags card */}
        {!!tags?.length && (
          <div className='skill-tag-card'>
            <h2>Tags</h2>
            {tags?.map((tag, index) => (
              <div key={`tag-${index}`} className='project-form-element'>
                <input
                  id='tags'
                  name={tag}
                  type='checkbox'
                  onChange={handleInputChange}
                />
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search and projects */}
      <div className='search-projects'>
        <div className='searchbar'>
          <input
            type='text'
            value={searchQuery}
            className='form-control'
            id='search'
            placeholder='Search...'
            onChange={({ target: { value } }) => setSearchQuery(value)}
          />
          <button className='btn btn-primary' onClick={handleSearch}>
            Serach
          </button>
        </div>
        {!!projects?.length && (
          <div className='project-list'>
            {projects?.map((project) => {
              const { id, name, description, creator, skills, tags } = project;
              return (
                <div
                  key={`project-${id}`}
                  className='project-card'
                  onClick={() => navigateToProject(id)}
                >
                  <div className='custom-card-header'>
                    <h3>{name}</h3>
                    <h5>{creator}</h5>
                  </div>
                  <div className='custom-card-body'>
                    <h4>{description}</h4>
                  </div>
                  <div className='custom-card-footer'>
                    <div className='skill-tags-detail'>
                      <h6>Skills</h6>
                      <p>{skills.join(', ')}</p>
                    </div>
                    <div className='skill-tags-detail'>
                      <h6>Tags</h6>
                      <p>{tags.join(', ')}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
