import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        (
            async () => {
                try{
                    const response = await axios.get('http://localhost:8000/api/user');
                    const user = response.data;

                    setMessage(`Hi ${user.first_name} ${user.last_name}!`)

                } catch (e) {
                    setMessage("You are not logged in!")
                }
                
            }
        )();
    });


    return (
        <div className="container"> 
            {message}
        </div>
    );
}

export default Home;