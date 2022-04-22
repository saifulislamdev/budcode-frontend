import React, { useState, useEffect } from 'react';
import { UserContext } from '../util/context';

export const UserContextWrapper = ({children}) => {
    const [authorization, setAuthorization] = useState('');
    const [username, setUsername] = useState('');

// function getToken()
//

    useEffect(() => {
        try {
            if (window.localStorage.getItem('authorization')) {
                setAuthorization(JSON.parse(window.localStorage.getItem('authorization')));
            }
            if (window.localStorage.getItem('username')) {
                setUsername(JSON.parse(window.localStorage.getItem('username')));
            }
            
          } catch (err) {
            // 👇️ This runs
            console.log('Error: ', err.message);
          }
        
    }, []);

return (
    <UserContext.Provider
    value = {{
        authorization, setAuthorization, username, setUsername
    }}>
        {children}
    </UserContext.Provider>
);
};