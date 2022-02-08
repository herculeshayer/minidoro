import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserDashboardInformation, getRedirectUser } from '../components/requestsAPI';

const Dashboard = () => {
    const navigate = useNavigate();


    const userRedirect = getRedirectUser(process.env.REACT_APP_REDIRECT_USER);
        
    /**
     * Redirect is there is NOT cookie present 
     */
    useEffect(() => {
        if(userRedirect === false) {
            alert("Please login");
            navigate('/login');
        }
    }, [userRedirect])
    
    
    
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