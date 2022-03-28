import React, { useState, useEffect } from 'react';
import { UserContext } from '../util/context';

export const UserContextWrapper = ({children}) => {
    const [authorization, setAuthorization] = useState('');

    useEffect(() => {
        if (window.localStorage.getItem('authorization')) {
            setAuthorization(JSON.parse(window.localStorage.getItem('authorization')));
        }
    }, []);

return (
    <UserContext.Provider
    value = {{
        authorization, setAuthorization,
    }}>
        {children}
    </UserContext.Provider>
);
};