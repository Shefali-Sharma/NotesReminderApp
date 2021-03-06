import React, { SyntheticEvent, useState } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const response = await axios.post("http://localhost:8000/api/login", {
            email: email,
            password: password
        });

        setRedirect(true)

    }

    if(redirect) {
        return <Redirect to="/"/>
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <input type="email" className="form-control" placeholder="Email" required autoFocus 
            onChange={e => setEmail(e.target.value)}/>

            <input type="password" className="form-control" placeholder="Password" required 
            onChange={e => setPassword(e.target.value)}/>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

          </form>
    );
}

export default Login;