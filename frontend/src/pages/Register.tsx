import React from 'react';

const Register = () => {
    return (
        <form>

            <h1 className="h3 mb-3 fw-normal">Create Account</h1>

            <input className="form-control" placeholder="First Name" required />
            <input className="form-control" placeholder="Last Name" required />
            <input type="email" className="form-control" placeholder="Email" required /> 
            <br />

            <input type="password" className="form-control" placeholder="Password" required />

            <input type="password" className="form-control" placeholder="Confirm Password" required />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>

          </form>
    );
}

export default Register;