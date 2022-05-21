import React, { useState, useEffect, useContext, useCallback } from 'react';
import { uniq, isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';

import './Search.css';

export default function Search() {
    const [projects, setProjects] = useState([]);
    const [tags, setTags] = useState([]);
    const [skills, setSkills] = useState([]);
    const [queryParams, setQueryParams] = useState({ skills: [], tags: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [userSkills, setUserSkills] = useState([]);
    const [loadedRecords, setLoadedRecords] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { username } = useContext(UserContext);

    const navigate = useNavigate();

    const getProjects = useCallback(() => {
        axiosInstance.get('/projects').then((res) => {
            const data = res.data; /* .slice(69, -1) */
            const uniqueTags = uniq(data.flatMap((item) => item.tags.map((tag) => tag.trim())));
            const uniqueSkills = uniq(data.flatMap((item) => item.skills.map((skill) => skill.trim())));
            setTags(uniqueTags);
            setSkills(uniqueSkills);
            setProjects(data);
            setLoadedRecords(data.splice(0, 30));
        });
    }, []);

    const handleInputChange = ({ target: { id, name, checked } }) => {
        setQueryParams({
            ...queryParams,
            [id]: { ...queryParams[id], [name]: checked },
        });
    };

    const handleSearch = () => {
        const { skills, tags } = queryParams;
        const skillsFilter = Object.keys(skills).filter((skill) => skills[skill] === true);
        const tagsFilter = Object.keys(tags).filter((tag) => tags[tag] === true);

        let url = '';
        if (skillsFilter.length) {
            skillsFilter.map((skill, index) => {
                if (index === 0) {
                    url = `?skill[]=${skill}`;
                } else url += `&skill[]=${skill}`;
            });
        }
        if (tagsFilter.length) {
            if (skillsFilter.length) {
                tagsFilter.map((skill, index) => {
                    url += `&tag[]=${skill}`;
                });
            } else {
                tagsFilter.map((skill, index) => {
                    if (index === 0) {
                        url += `?tag[]=${skill}`;
                    } else url += `&tag[]=${skill}`;
                });
            }
        }
        if (!!searchQuery) {
            if (skillsFilter.length === 0 && tagsFilter.length === 0) {
                url += `?search=${searchQuery}`;
            } else {
                url += `&search=${searchQuery}`;
            }
        }
        console.log(url);

        axiosInstance.get(`/projects${url}`).then((res) => {
            const projects = res.data;
            setProjects(projects);
            setLoadedRecords(projects);
            projects.length < 30 && setHasMore(false);
            setSkills (
                uniq(
                    projects.flatMap((item) => item.skills.map((skill) => skill.trim()))
                )
            );
            setTags(
                uniq(projects.flatMap((item) => item.tags.map((tag) => tag.trim())))
            );
        });
    };

    const navigateToProject = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    useEffect(() => {
        const { skills, tags } = queryParams;
        (!isEmpty(skills) || !isEmpty(tags)) && handleSearch();
    }, [queryParams]);

    useEffect(() => {
        username &&
            axiosInstance.get(`/users/${username}`).then((res) => {
                setUserSkills(res?.data?.skills);
            });
    }, [username]);

    const fetchMoreData = () => {
        if (loadedRecords.length < projects.length) {
            setLoadedRecords(loadedRecords.concat(projects.splice(0, 30)));
        } else {
            setHasMore(false);
        }
    };
    return (
        <div className="search-page">
            <div className="skills-tag-container">
                {/* Skills card */}
                    <div className="skill-tag-card">
                        <h2>Skills</h2>
                        {!!skills?.length && skills?.map((skill, index) => (
                            <div key={`tag-${index}`} className="project-form-element">
                                <input id="skills" name={skill} type="checkbox" onChange={handleInputChange} />
                                <label htmlFor={skill}>{skill}</label>
                            </div>
                        ))}
                    </div>
                

                {/* Tags card */}
                    <div className="skill-tag-card">
                        <h2>Tags</h2>
                        {!!tags?.length && tags?.map((tag, index) => (
                            <div key={`tag-${index}`} className="project-form-element">
                                <input id="tags" name={tag} type="checkbox" onChange={handleInputChange} />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        ))}
                    </div>
               
            </div>

            {/* Search and projects */}
            <div className="search-projects">
                <div className="searchbar">
                    <input
                        type="text"
                        value={searchQuery}
                        className="form-control"
                        id="search"
                        placeholder="What would you like to search for?"
                        onChange={({ target: { value } }) => setSearchQuery(value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                {!!projects?.length ? (
                    <InfiniteScroll
                        dataLength={projects.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        height={700}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className="project-list">
                            {loadedRecords?.map((project) => {
                                const { id, name, description, creator, skills, tags } = project;
                                return (
                                    <div
                                        key={`project-${id}`}
                                        className="project-card"
                                        onClick={() => navigateToProject(id)}
                                    >
                                        <div className="custom-card-header">
                                            <div className="title-container">
                                                <h3>{name}</h3>
                                                {userSkills?.find((skill) => skills.includes(skill)) && (
                                                    <span>Suggested</span>
                                                )}
                                            </div>
                                            <h5>{creator}</h5>
                                        </div>
                                        <div className="custom-card-body">
                                            <h4 className = "custom-body-text">{description}</h4>
                                        </div>
                                        <div className="custom-card-footer">
                                            <div className="skill-tags-detail">
                                                <h6>Skills</h6>
                                                <p>{skills.join(', ')}</p>
                                            </div>
                                            <div className="skill-tags-detail">
                                                <h6>Tags</h6>
                                                <p>{tags.join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                ) : null}
            </div>
        </div>
    );
}
