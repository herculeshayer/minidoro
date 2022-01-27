import React, { useState, useEffect } from 'react';





const postLoginInformation = (URL, payload) => {

    console.log('URL', URL);
    console.log('payload', payload)

    const fetchUserData = async () => {
        await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
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
                    // window.location('http://localhost:3000/dashboard');
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

const getUserDashboardInformation = (URL) => {
    const [userData, setUserData] = useState([]);
    const getUserInfo = () => {
        fetch(URL, {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUserData(data)
        })
    } 
    useEffect(() => {
        
        getUserInfo();

    }, [])

    return userData;
}


export { 
    postLoginInformation,
    postRegistrationInformation,
    getUserDashboardInformation
}