import React, { useState } from 'react';





const postLoginInformation = (URL, payload) => {

    console.log('URL', URL);
    console.log('payload', payload)

    // let token = 0;

    const fetchUserData = async () => {
        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data=> {
                // token = data;
                if(data.status === "OK") {
                    /**
                     * Redirect to dashboard?
                     * Dashboard will check for JWT and get all userdata?
                     */
                }
                console.log(data)
            })
            .catch(err => console.log(err))            
        }
        
    fetchUserData();
        
 

}

const postRegistrationInformation = (URL, payload) => {
    
    const fetchUserData = async () => {
        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data=> {
                // token = data;
                if(data.status === "OK") {
                    /**
                     * Redirect to login?
                     * User logs in with registered information
                     */
                }
                console.log(data)
            })
            .catch(err => console.log(err))            
        }
        
    fetchUserData();
}


export { 
    postLoginInformation,
    postRegistrationInformation
}