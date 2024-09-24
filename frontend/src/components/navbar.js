import React from "react";
import logo from "../logo.svg";
// we import NavLink to utilize the react router
import { NavLink } from "react-router-dom";
import "../App.css";

//here we display the Navbar
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="Logo" />
            </NavLink>
            <div className="navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            List
                        </NavLink>  
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">
                            Create Post
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>  
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}