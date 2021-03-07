import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = ({ user, setLogin }: { user: any , setLogin: Function}) => {
    const logout = async () => {
        await axios.post("http://localhost:8000/api/logout", {});

        setLogin();
    }

    let links;

    if (user) {
        links = (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={logout} to="/">Logout</Link>
            </li>
        </ul>
        );
    } else {
        links = (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">SignUp</Link>
            </li>
        </ul>
        );
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Notes Application</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {links}
            </div>

        </nav>
    );
}

export default Nav;
