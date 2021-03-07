import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const response = await axios.post("http://localhost:8000/api/register", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirm: confirmPassword
        });

        console.log(response)

    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Create Account</h1>

            <input className="form-control" placeholder="First Name" required 
            onChange={e => setFirstName(e.target.value)}/>

            <input className="form-control" placeholder="Last Name" required 
            onChange={e => setLastName(e.target.value)}/>

            <input type="email" className="form-control" placeholder="Email" required 
            onChange={e => setEmail(e.target.value)}/> 
            <br />

            <input type="password" className="form-control" placeholder="Password" required 
            onChange={e => setPassword(e.target.value)}/>

            <input type="password" className="form-control" placeholder="Confirm Password" required 
            onChange={e => setconfirmPassword(e.target.value)}/>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>

          </form>
    );
}

export default Register;