import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if logged in

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {!isLoggedIn && (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-secondary">Signup</button>
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <button 
                            className="btn btn-danger" 
                            onClick={() => {
                                setIsLoggedIn(false); // Log out and set state to false
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
