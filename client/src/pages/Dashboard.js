
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { getUserDashboardInformation } from '../components/requestsAPI';

const Dashboard = () => {
    // const userData;

    // useEffect(()=> {
        
    // }, [])
    
    const userData = getUserDashboardInformation(process.env.REACT_APP_DASHBOARD_API_URL);

    const [timer, setTimer] = useState(25*60);

    /**
     * 
     * pseudocode
     */

    // if(no coookie) {
    //     Navigate('/login')
    // }

    // setInterval(() => {
        
    //     setTimer(() => timer - 1000);

    // }, 1000);


    // console.log(userData);

    return(
        <>
            <h1>Dashboard</h1>
            <h3>{userData.username}</h3>
            <h3>{userData.email}</h3>
            {/* <h3>{timer}</h3> */}
        </>
    );
}

export default Dashboard;