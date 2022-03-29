import React, { useState, useEffect } from 'react';
import { UserContext } from '../util/context';

export const UserContextWrapper = ({children}) => {
    const [authorization, setAuthorization] = useState('');

    useEffect(() => {
        try {
            if (window.localStorage.getItem('authorization')) {
                setAuthorization(JSON.parse(window.localStorage.getItem('authorization')));
            }
            
          } catch (err) {
            // 👇️ This runs
            console.log('Error: ', err.message);
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