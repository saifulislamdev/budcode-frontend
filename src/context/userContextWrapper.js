import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../util/config';
import { UserContext } from '../util/context';

export const UserContextWrapper = ({ children }) => {
    const [authorization, setAuthorization] = useState(
        window.localStorage.getItem('authorization')?.replace(/['"]+/g, ''),
    );
    const [username, setUsername] = useState('');
    const [updatesList, setUpdatesList] = useState([]);

    useEffect(() => {
        try {
            if (authorization) {
                setUsername(JSON.parse(window.localStorage.getItem('username')));
            }
            if (authorization) {
                axiosInstance.get(`/updates`, { headers: { authorization: 'Bearer ' + authorization } }).then((res) => {
                    console.log('updates', res.data);
                    if (window.localStorage.getItem('updates')) {
                        const list = JSON.parse(window.localStorage.getItem('updates'));
                        setUpdatesList(list);
                    } else {
                        setUpdatesList(res.data);
                    }
                });
            }
        } catch (err) {
            // 👇️ This runs
            console.log('Error: ', err.message);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                authorization,
                setAuthorization,
                username,
                setUsername,
                updatesList,
                setUpdatesList,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
