import React from 'react';

const Home = ({user}: {user: any}) => {
    let message = 'You are not logged in!';
    if(user) {
        message = `Hi ${user.first_name} ${user.last_name}!`;
    }
    
    return (
        <div className="container"> 
            {message}
        </div>
    );
}

export default Home;