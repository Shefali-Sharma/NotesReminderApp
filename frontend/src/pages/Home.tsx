import React from 'react';
import Notebook from './Notebook';

const Home = ({user}: {user: any}) => {
    let message;
    if(user) {
        message = (<Notebook />);
    } else {
        message = 'You are not logged in!'
    }
    
    return (
        <div> 
            {message}
        </div>
    );
}

export default Home;